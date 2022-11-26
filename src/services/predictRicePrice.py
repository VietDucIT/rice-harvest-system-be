from pandas import read_csv
from matplotlib import pyplot
from statsmodels.tsa.ar_model import AutoReg
from sklearn.metrics import mean_squared_error
from math import sqrt


### FOR DAI THOM 8
# load dataset
series_DT8 = read_csv('src/data/daiThom8.csv', header=0, index_col=0, parse_dates=True, squeeze=True)
# print(series_DT8.head())
# series_DT8.plot()
# pyplot.grid()
# pyplot.show()

# split dataset
X_DT8 = series_DT8.values
train_DT8, test_DT8 = X_DT8[1:len(X_DT8)-10], X_DT8[len(X_DT8)-10:]

# train autoregression
window = 29
model_DT8 = AutoReg(train_DT8, lags=29)
model_fit = model_DT8.fit()
coef = model_fit.params

# walk forward over time steps in test
history_DT8 = train_DT8[len(train_DT8)-window:]
history_DT8 = [history_DT8[i] for i in range(len(history_DT8))]
predictions_DT8 = list()

print('DAI THOM 8 PREDICTION')
for t in range(len(test_DT8)):
	length = len(history_DT8)
	lag = [history_DT8[i] for i in range(length-window,length)]
	yhat = coef[0]
	for d in range(window):
		yhat += coef[d+1] * lag[window-d-1]
	obs = test_DT8[t]
	predictions_DT8.append(yhat)
	history_DT8.append(obs)
	print('Predicted=%d, Expected=%d' % (yhat, obs))

rmse = sqrt(mean_squared_error(test_DT8, predictions_DT8))
print('Test RMSE: %d' % rmse)




### FOR IR504
# load dataset
series_IR504 = read_csv('src/data/ỉ504.csv', header=0, index_col=0, parse_dates=True, squeeze=True)
# print(series_IR504.head())
# series_IR504.plot()
# pyplot.grid()
# pyplot.show()

# split dataset
X_IR504 = series_IR504.values
train_IR504, test_IR504 = X_IR504[1:len(X_IR504)-10], X_IR504[len(X_IR504)-10:]

# train autoregression
window = 29
model_IR504 = AutoReg(train_IR504, lags=29)
model_fit = model_IR504.fit()
coef = model_fit.params

# walk forward over time steps in test
history_IR504 = train_IR504[len(train_IR504)-window:]
history_IR504 = [history_IR504[i] for i in range(len(history_IR504))]
predictions_IR504 = list()

print('IR504 PREDICTION')
for t in range(len(test_IR504)):
	length = len(history_IR504)
	lag = [history_IR504[i] for i in range(length-window,length)]
	yhat = coef[0]
	for d in range(window):
		yhat += coef[d+1] * lag[window-d-1]
	obs = test_IR504[t]
	predictions_IR504.append(yhat)
	history_IR504.append(obs)
	print('Predicted=%d, Expected=%d' % (yhat, obs))

rmse = sqrt(mean_squared_error(test_IR504, predictions_IR504))
print('Test RMSE: %d' % rmse)




### FOR OM18
# load dataset
series_OM18 = read_csv('src/data/om18.csv', header=0, index_col=0, parse_dates=True, squeeze=True)
# print(series_OM18.head())
# series_OM18.plot()
# pyplot.grid()
# pyplot.show()

# split dataset
X_OM18 = series_OM18.values
train_OM18, test_OM18 = X_OM18[1:len(X_OM18)-10], X_OM18[len(X_OM18)-10:]

# train autoregression
window = 29
model_OM18 = AutoReg(train_OM18, lags=29)
model_fit = model_OM18.fit()
coef = model_fit.params

# walk forward over time steps in test
history_OM18 = train_OM18[len(train_OM18)-window:]
history_OM18 = [history_OM18[i] for i in range(len(history_OM18))]
predictions_OM18 = list()

print('OM18 PREDICTION')
for t in range(len(test_OM18)):
	length = len(history_OM18)
	lag = [history_OM18[i] for i in range(length-window,length)]
	yhat = coef[0]
	for d in range(window):
		yhat += coef[d+1] * lag[window-d-1]
	obs = test_OM18[t]
	predictions_OM18.append(yhat)
	history_OM18.append(obs)
	print('Predicted=%d, Expected=%d' % (yhat, obs))

rmse = sqrt(mean_squared_error(test_OM18, predictions_OM18))
print('Test RMSE: %d' % rmse)




### FOR OM5451
# load dataset
series_OM5451 = read_csv('src/data/om5451.csv', header=0, index_col=0, parse_dates=True, squeeze=True)
# print(series_OM5451.head())
# series_OM5451.plot()
# pyplot.grid()
# pyplot.show()

# split dataset
X_OM5451 = series_OM5451.values
train_OM5451, test_OM5451 = X_OM5451[1:len(X_OM5451)-10], X_OM5451[len(X_OM5451)-10:]

# train autoregression
window = 29
model_OM5451 = AutoReg(train_OM5451, lags=29)
model_fit = model_OM5451.fit()
coef = model_fit.params

# walk forward over time steps in test
history_OM5451 = train_OM5451[len(train_OM5451)-window:]
history_OM5451 = [history_OM5451[i] for i in range(len(history_OM5451))]
predictions_OM5451 = list()

print('OM5451 PREDICTION')
for t in range(len(test_OM5451)):
	length = len(history_OM5451)
	lag = [history_OM5451[i] for i in range(length-window,length)]
	yhat = coef[0]
	for d in range(window):
		yhat += coef[d+1] * lag[window-d-1]
	obs = test_OM5451[t]
	predictions_OM5451.append(yhat)
	history_OM5451.append(obs)
	print('Predicted=%d, Expected=%d' % (yhat, obs))

rmse = sqrt(mean_squared_error(test_OM5451, predictions_OM5451))
print('Test RMSE: %d' % rmse)

## Show line chart
# pyplot.plot(test)												# Thực tế
# pyplot.plot(predictions, color='red')		# Dự báo
# pyplot.title("Biểu đồ dự báo giá lúa")
# pyplot.xlabel("Ngày")
# pyplot.ylabel("Giá lúa (đồng/kg)")
# # pyplot.xticks(np.arange(0,8,1))
# # pyplot.yticks(np.arange(11, 17, 0.5))
# pyplot.show()
