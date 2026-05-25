import pytest


pytestmark = pytest.mark.asyncio


async def test_recomendar_sin_token_retorna_401(client):
    response = await client.post(
        "/api/v1/recomendar",
        json={"lat": -15.84, "lon": -70.02, "tipo_atencion": "vacunacion", "edad": 25, "max_distancia_km": 30, "top_n": 5},
    )
    assert response.status_code == 401


async def test_recomendar_ok_retorna_top5(client, token):
    response = await client.post(
        "/api/v1/recomendar",
        headers={"Authorization": f"Bearer {token}"},
        json={"lat": -15.84, "lon": -70.02, "tipo_atencion": "vacunacion", "edad": 25, "max_distancia_km": 100, "top_n": 5},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["consulta_id"] >= 1
    assert len(data["recomendaciones"]) == 5


async def test_recomendar_zona_alerta_roja_penaliza_score(client, token):
    response = await client.post(
        "/api/v1/recomendar",
        headers={"Authorization": f"Bearer {token}"},
        json={"lat": -14.90843, "lon": -70.19608, "tipo_atencion": "tamizaje", "edad": 60, "max_distancia_km": 20, "top_n": 3},
    )
    assert response.status_code == 200
    recs = response.json()["recomendaciones"]
    assert any(item["nivel_alerta"] == 3 and item["penalidad_clima"] == 0.9 for item in recs)


async def test_historial_usuario_vacio(client, token):
    response = await client.get("/api/v1/historial", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json() == []

