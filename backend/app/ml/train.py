from pathlib import Path
import joblib
import numpy as np


MODEL_PATH = Path(__file__).resolve().parent / "modelo_salud.pkl"


def train_model() -> dict[str, str | int]:
    artifact = {
        "categorias": ["I-1", "I-2", "I-3", "I-4", "II-1", "II-2"],
        "servicios": [
            "vacunacion",
            "control prenatal",
            "control cred",
            "tamizaje",
            "odontologia",
            "psicologia",
            "nutricion",
            "planificacion familiar",
        ],
        "item_matrix_shape": np.array([[1.0, 0.0], [0.0, 1.0]]).shape,
        "descripcion": "Artefacto base para el recomendador content-based del backend.",
    }
    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(artifact, MODEL_PATH)
    return {"status": "ok", "modelo": str(MODEL_PATH), "componentes": len(artifact)}


if __name__ == "__main__":
    print(train_model())

