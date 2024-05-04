FROM python:3.11.9

ENV PYTHONUNBUFFERED=1

RUN apt-get update;\
    apt-get install vim -y;

RUN mkdir /home/project
WORKDIR /home/project

COPY requirements.txt /home/project/
RUN pip install -r requirements.txt

# COPY .env /home/project/

CMD ["python", "./manage.py", "runserver", "0.0.0.0:8000"]

