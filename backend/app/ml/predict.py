from pathlib import Path
import joblib
from app.ml.train import MODEL_PATH, train_model


def load_model() -> dict:
    if not Path(MODEL_PATH).exists():
        train_model()
    return joblib.load(MODEL_PATH)

