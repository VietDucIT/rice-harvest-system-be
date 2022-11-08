# print('Predict Access.')

from pandas import read_csv
from matplotlib import pyplot
from statsmodels.tsa.ar_model import AutoReg
from sklearn.metrics import mean_squared_error
from math import sqrt

# load dataset
series = read_csv('src/data/om18.csv', header=0, index_col=0, parse_dates=True, squeeze=True)
# print(series.head())
# series.plot()
# pyplot.grid()
# pyplot.show()

# split dataset
X = series.values
train, test = X[1:len(X)-10], X[len(X)-10:]

# train autoregression
window = 29
model = AutoReg(train, lags=29)
model_fit = model.fit()
coef = model_fit.params

# walk forward over time steps in test
history = train[len(train)-window:]
history = [history[i] for i in range(len(history))]
predictions = list()

for t in range(len(test)):
	length = len(history)
	lag = [history[i] for i in range(length-window,length)]
	yhat = coef[0]
	for d in range(window):
		yhat += coef[d+1] * lag[window-d-1]
	obs = test[t]
	predictions.append(yhat)
	history.append(obs)
	print('Predicted=%d, Expected=%d' % (yhat, obs))

rmse = sqrt(mean_squared_error(test, predictions))
print('Test RMSE: %d' % rmse)

## Show line chart
# pyplot.plot(test)												# Thực tế
# pyplot.plot(predictions, color='red')		# Dự báo
# pyplot.title("Biểu đồ dự báo giá lúa")
# pyplot.xlabel("Ngày")
# pyplot.ylabel("Giá lúa (đồng/kg)")
## pyplot.xticks(np.arange(0,8,1))
## pyplot.yticks(np.arange(11, 17, 0.5))
# pyplot.show()
