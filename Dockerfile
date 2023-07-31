FROM jupyter/base-notebook

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8888

CMD ["jupyter", "notebook"]