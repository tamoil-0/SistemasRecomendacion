import pytest


pytestmark = pytest.mark.asyncio


async def test_register_ok(client):
    response = await client.post(
        "/api/v1/auth/register",
        json={"email": "user1@example.com", "nombre": "Usuario Uno", "password": "password123"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "user1@example.com"
    assert data["token"]


async def test_register_email_duplicado(client):
    payload = {"email": "dup@example.com", "nombre": "Duplicado", "password": "password123"}
    assert (await client.post("/api/v1/auth/register", json=payload)).status_code == 201
    response = await client.post("/api/v1/auth/register", json=payload)
    assert response.status_code == 400


async def test_login_ok(client):
    payload = {"email": "login@example.com", "nombre": "Login User", "password": "password123"}
    await client.post("/api/v1/auth/register", json=payload)
    response = await client.post("/api/v1/auth/login", json={"email": payload["email"], "password": "password123"})
    assert response.status_code == 200
    assert response.json()["token_type"] == "bearer"


async def test_login_password_incorrecto(client):
    payload = {"email": "badpass@example.com", "nombre": "Bad Pass", "password": "password123"}
    await client.post("/api/v1/auth/register", json=payload)
    response = await client.post("/api/v1/auth/login", json={"email": payload["email"], "password": "wrongpass"})
    assert response.status_code == 401

