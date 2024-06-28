from rest_framework import serializers
from .models import User, Role, UserRole

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name']

class UserRoleSerializer(serializers.ModelSerializer):
    role = RoleSerializer()

    class Meta:
        model = UserRole
        fields = ['role']

class UserSerializer(serializers.ModelSerializer):
    roles = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'roles']

    def get_roles(self, obj):
        return [role.name for role in obj.roles.all()]
    
    def create(self, validated_data):
        roles_data = validated_data.pop('roles')
        user = User.objects.create(**validated_data)
        for role_data in roles_data:
            role, created = Role.objects.get_or_create(**role_data)
            UserRole.objects.create(user=user, role=role)
        return user

    def update(self, instance, validated_data):
        roles_data = validated_data.pop('roles')
        instance = super().update(instance, validated_data)

        UserRole.objects.filter(user=instance).delete()
        for role_data in roles_data:
            role, created = Role.objects.get_or_create(**role_data)
            UserRole.objects.create(user=instance, role=role)
        return instance


class UpdateUserRolesSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    roles = serializers.ListField(
        child=serializers.ChoiceField(choices=['admin', 'editor', 'player'])
    )

    def update_roles(self, validated_data):
        try:
            user = User.objects.get(id=validated_data['user_id'])
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found")

        roles = validated_data['roles']
        role_objects = Role.objects.filter(name__in=roles)

        if len(roles) != role_objects.count():
            raise serializers.ValidationError("Invalid roles provided")

        user.roles.set(role_objects)
        user.save()
        return user

class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Les nouveaux mots de passe ne correspondent pas.")
        return attrs
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']