def penalidad_climatica(nivel_alerta: int) -> float:
    nivel = max(0, min(3, int(nivel_alerta)))
    return round(nivel * 0.3, 2)


def score_final(score_similitud: float, nivel_alerta: int) -> float:
    return float(score_similitud) * (1 - penalidad_climatica(nivel_alerta))

