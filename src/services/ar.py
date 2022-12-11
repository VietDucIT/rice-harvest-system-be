from matplotlib import pyplot
from pandas import read_csv
from pandas.plotting import lag_plot
from pandas import DataFrame
from pandas import concat
from pandas.plotting import autocorrelation_plot
from statsmodels.tsa.ar_model import AutoReg
from sklearn.metrics import mean_squared_error
from statsmodels.graphics.tsaplots import plot_acf
from math import sqrt

### Step 1: Overview dataset
# series = read_csv('src/data/om5451.csv', header=0, index_col=0)
# print(series.head())
# series.plot()
# pyplot.grid()
# pyplot.show()


### Step 2: Check correlation 
## Option 2.1: lag_plot()
## Due to the same value, many point is in the same position
# series = read_csv('src/data/om5451.csv', header=0, index_col=0)
# lag_plot(series)
# pyplot.show()

## Option 2.2: corr()
## Return a good result for using Autoregressive Model
# series = read_csv('src/data/om5451.csv', header=0, index_col=0)
# values = DataFrame(series.values)
# dataframe = concat([values.shift(1), values], axis=1)
# dataframe.columns = ['t-1', 't']
# result = dataframe.corr()
# print(result)

## Option 2.3: autoregresion_lot()
# series = read_csv('src/data/om5451.csv', header=0, index_col=0)
# autocorrelation_plot(series)
# pyplot.show()

## Option 2.4: plot_acf()
# series = read_csv('src/data/om5451.csv', header=0, index_col=0)
# plot_acf(series, lags=60)
# pyplot.show()


### Step 3
## Option 3.1: Persistence Model
# series = read_csv('src/data/om5451.csv', header=0, index_col=0)
## create lagged dataset
# values = DataFrame(series.values)
# dataframe = concat([values.shift(1), values], axis=1)
# dataframe.columns = ['t-1', 't']
## split into train and test sets
# X = dataframe.values
# train, test = X[1:len(X)-7], X[len(X)-7:]
# train_X, train_y = train[:,0], train[:,1]
# test_X, test_y = test[:,0], test[:,1]

## persistence model
# def model_persistence(x):
# 	return x

## walk-forward validation
# predictions = list()
# for x in test_X:
# 	yhat = model_persistence(x)
# 	predictions.append(yhat)
# test_score = mean_squared_error(test_y, predictions)
# print('Test MSE: %.3f' % test_score)
## plot predictions vs expected
# pyplot.plot(test_y)
# pyplot.plot(predictions, color='red')
# pyplot.show()


# Option 3.2: Autoregressive Model
series = read_csv('src/data/om5451.csv', header=0, index_col=0, parse_dates=True)
series.squeeze('columns')
# print(series.head())
# series.plot()
# pyplot.grid()
# pyplot.show()

# split dataset
X = series.values
train, test = X[1:len(X)-7], X[len(X)-7:]		# try with 11, 12, 13, 14

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
	print('Predicted = %d, Expected = %d' % (yhat, obs))

rmse = sqrt(mean_squared_error(test, predictions))
print('Test RMSE: %d' % rmse)

## Show line chart
pyplot.plot(test, label='Thực tế')
pyplot.plot(predictions, color='red', label='Dự báo')
pyplot.title("Biểu đồ dự báo giá lúa OM 5451")
pyplot.xlabel("Ngày")
pyplot.ylabel("Giá lúa (đồng/kg)")
# pyplot.xticks(np.arange(0,8,1))
# pyplot.yticks(np.arange(11, 17, 0.5))
pyplot.legend()
pyplot.show()



### Step 4: Forecast for next 7 days ???
# series = read_csv('src/data/om5451.csv', header=0, index_col=0, parse_dates=True)
# series.squeeze('columns')
# X = series.values
# history = [x for x in X]
# # walk-forward validation
# for i in range(7):
#   model = AutoReg(history, lags=7)
#   model_fit = model.fit()
#   length = len(history)
#   lag = [history[i] for i in range(length-window,length)]
#   yhat = coef[0]
#   for d in range(window):
#     yhat += coef[d+1] * lag[window-d-1]
#   obs = test[t]

#   output = model_fit.forecast()
#   yhat = output[0]
#   diff = yhat - history[-1]
#   history.append(history[-1] + diff)
#   print('Day %d: %.0f' % (i+1, yhat))
