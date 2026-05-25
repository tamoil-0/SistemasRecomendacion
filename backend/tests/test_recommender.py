import numpy as np
from app.services.recommender import cosine_score, rank_candidates, Candidate
from app.models.establecimiento import Establecimiento, Servicio
from app.schemas.recomendacion import ConsultaCreate
from app.utils.penalidad import penalidad_climatica, score_final


def test_cosine_similarity_calculo_correcto():
    assert cosine_score(np.array([1, 0]), np.array([1, 0])) == 1.0


def test_penalidad_nivel0_es_cero():
    assert penalidad_climatica(0) == 0.0


def test_penalidad_nivel3_es_09():
    assert penalidad_climatica(3) == 0.9


def test_score_final_formula():
    assert score_final(0.8, 2) == 0.32000000000000006


def test_top_n_ordenado_descendente():
    consulta = ConsultaCreate(
        lat=-15.84, lon=-70.02, tipo_atencion="vacunacion", edad=30, max_distancia_km=50, top_n=2
    )
    est1 = Establecimiento(
        id=1,
        codigo_renipress="1",
        nombre="A",
        categoria="I-4",
        ubigeo="210101",
        latitud=-15.84,
        longitud=-70.02,
        capacidad_camas=20,
        servicios=[Servicio(tipo_servicio="vacunacion", disponible=True)],
    )
    est2 = Establecimiento(
        id=2,
        codigo_renipress="2",
        nombre="B",
        categoria="I-1",
        ubigeo="210102",
        latitud=-15.85,
        longitud=-70.03,
        capacidad_camas=2,
        servicios=[Servicio(tipo_servicio="psicologia", disponible=True)],
    )
    result = rank_candidates(consulta, [Candidate(est2, 2.0, 0), Candidate(est1, 1.0, 0)])
    assert [item.rank for item in result] == [1, 2]
    assert result[0].score_final >= result[1].score_final

