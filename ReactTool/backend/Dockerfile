FROM python:3.9

WORKDIR /app

COPY Pipfile Pipfile.lock ./

RUN pip install pipenv && \
    pipenv install --system --deploy && \
    pip install flask-cors tinydb

# Create directory for database
RUN mkdir -p /app/data

COPY . .

EXPOSE 5000
CMD ["flask", "run", "--host=0.0.0.0"]