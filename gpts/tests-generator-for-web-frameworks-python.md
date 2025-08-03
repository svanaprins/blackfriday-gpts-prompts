

# Tests generator for web frameworks [Python] | [Start Chat](https://gptcall.net/chat.html?data=%7B%22contact%22%3A%7B%22id%22%3A%22PuJX4iOvRodiib0pUxu5E%22%2C%22flow%22%3Atrue%7D%7D)
Create test cases for python web framework easily. Uses build-in features and best approaches. Checks for status codes.

# Prompt

```
You are test writer for web framework {{ framework }}. You provide all possible tests for a handler provided bellow. Split tests by functions. Use max built-in capabilities. Follow best-practices. Share code only.
Handler:
{{ handler }}}}}
```

## Welcome Message
```python
import io
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.testclient import TestClient
import pytest

app = FastAPI()


@app.post("/files/")
async def create_file(
    file: UploadFile = File(...),
    fileb: UploadFile = File(...),
    token: str = Form(..., min_length=1),
):
    data = await file.read()
    return {
        "file_size": len(data),
        "token": token,
        "fileb_content_type": fileb.content_type,
    }


client = TestClient(app)


@pytest.fixture(scope="module")
def valid_data():
    return {
        "file": ("test.txt", io.BytesIO(b"valid data"), "text/plain"),
        "fileb": ("test.txt", io.BytesIO(b"valid data"), "text/plain"),
        "token": "valid_token",
    }


def test_create_file_with_valid_data(valid_data):
    response = client.post(
        "/files/",
        files=valid_data["file"],
        data={"token": valid_data["token"]},
    )
    assert response.status_code == 200
    assert response.json() == {
        "file_size": 10,
        "token": "valid_token",
        "fileb_content_type": "text/plain",
    }


def test_create_file_with_invalid_token(valid_data):
    invalid_token = ""
    response = client.post(
        "/files/",
        files=valid_data["file"],
        data={"token": invalid_token},
    )
    assert response.status_code == 422


def test_create_file_with_invalid_file_parameter(valid_data):
    response = client.post(
        "/files/",
        files={"file": ("test.txt", io.StringIO("invalid data"), "text/plain")},
        data={"token": valid_data["token"]},
    )
    assert response.status_code == 422


def test_create_file_with_invalid_fileb_parameter(valid_data):
    response = client.post(
        "/files/",
        files={"fileb": ("test.txt", io.StringIO("invalid data"), "text/plain")},
        data={"token": valid_data["token"]},
    )
    assert response.status_code == 422


def test_create_file_with_missing_file_parameter(valid_data):
    response = client.post(
        "/files/",
        files={"fileb": ("test.txt", io.BytesIO(b"valid data"), "text/plain")},
        data={"token": valid_data["token"]},
    )
    assert response.status_code == 422


def test_create_file_with_missing_fileb_parameter(valid_data):
    response = client.post(
        "/files/",
        files={"file": ("test.txt", io.BytesIO(b"valid data"), "text/plain")},
        data={"token": valid_data["token"]},
    )
    assert response.status_code == 422


def test_create_file_with_missing_parameters():
    response = client.post("/files/")
    assert response.status_code == 422
```

## Conversation

```python
import io
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.testclient import TestClient
import pytest

app = FastAPI()


@app.post("/files/")
async def create_file(
    file: UploadFile = File(...),
    fileb: UploadFile = File(...),
    token: str = Form(..., min_length=1),
):
    data = await file.read()
    return {
        "file_size": len(data),
        "token": token,
        "fileb_content_type": fileb.content_type,
    }


client = TestClient(app)


@pytest.fixture(scope="module")
def valid_data():
    return {
        "file": ("test.txt", io.BytesIO(b"valid data"), "text/plain"),
        "fileb": ("test.txt", io.BytesIO(b"valid data"), "text/plain"),
        "token": "valid_token",
    }


def test_create_file_with_valid_data(valid_data):
    response = client.post(
        "/files/",
        files=valid_data["file"],
        data={"token": valid_data["token"]},
    )
    assert response.status_code == 200
    assert response.json() == {
        "file_size": 10,
        "token": "valid_token",
        "fileb_content_type": "text/plain",
    }


def test_create_file_with_invalid_token(valid_data):
    invalid_token = ""
    response = client.post(
        "/files/",
        files=valid_data["file"],
        data={"token": invalid_token},
    )
    assert response.status_code == 422


def test_create_file_with_invalid_file_parameter(valid_data):
    response = client.post(
        "/files/",
        files={"file": ("test.txt", io.StringIO("invalid data"), "text/plain")},
        data={"token": valid_data["token"]},
    )
    assert response.status_code == 422


def test_create_file_with_invalid_fileb_parameter(valid_data):
    response = client.post(
        "/files/",
        files={"fileb": ("test.txt", io.StringIO("invalid data"), "text/plain")},
        data={"token": valid_data["token"]},
    )
    assert response.status_code == 422


def test_create_file_with_missing_file_parameter(valid_data):
    response = client.post(
        "/files/",
        files={"fileb": ("test.txt", io.BytesIO(b"valid data"), "text/plain")},
        data={"token": valid_data["token"]},
    )
    assert response.status_code == 422


def test_create_file_with_missing_fileb_parameter(valid_data):
    response = client.post(
        "/files/",
        files={"file": ("test.txt", io.BytesIO(b"valid data"), "text/plain")},
        data={"token": valid_data["token"]},
    )
    assert response.status_code == 422


def test_create_file_with_missing_parameters():
    response = client.post("/files/")
    assert response.status_code == 422
```

