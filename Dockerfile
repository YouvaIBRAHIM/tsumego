FROM python:3.11.9

# Set environment variables
ENV PIP_DISABLE_PIP_VERSION_CHECK=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Update apt-get
RUN apt-get update;\
    apt-get install vim -y;

# Set work directory
RUN mkdir /home/project
WORKDIR /home/project

# Install dependencies
COPY requirements.txt /home/project/
RUN pip install -r requirements.txt