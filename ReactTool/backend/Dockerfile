FROM python:3.9

WORKDIR /app

COPY Pipfile Pipfile.lock ./

RUN pip install pipenv && \
    pipenv install --system --deploy && \
    pip install flask-cors

# Create necessary directories for data storage
RUN mkdir -p /app/surveys/quiz

COPY . .

EXPOSE 5000
CMD ["flask", "run", "--host=0.0.0.0"]