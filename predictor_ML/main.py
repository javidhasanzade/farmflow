from fastapi import FastAPI
import uvicorn
import pickle
import numpy as np
import sklearn

app = FastAPI()


def load_model():
    with open('model.pkl', 'rb') as file:
        load_data = pickle.load(file)
    return load_data


data = load_model()

regressor = data["model"]
le_commodity = data["le_commodity"]
le_unit = data["le_unit"]


def predict(commodity, unit, month):
    X = np.array([[commodity, unit, month]])
    X[:, 0] = le_commodity.transform(X[:, 0])
    X[:, 1] = le_unit.transform(X[:, 1])
    X = X.astype(float)
    print(X)
    return regressor.predict(X)


@app.get("/api/v1/predict")
async def root(product: str, unit: str, month: int):
    return {"price": f"{predict(product, unit, month)}"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8005)
