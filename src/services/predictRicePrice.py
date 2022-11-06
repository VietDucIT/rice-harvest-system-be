# print('Predict Access.\n123')

# import sys
# print('Argument: ' + sys.argv[1])

# plt.xlabel('Ngày')
# plt.ylabel('Giá (đồng/kg)')
# plt.show()


from pandas import read_csv
from matplotlib import pyplot

# Step 1: Overview dataset
# series = read_csv('src/data/mock_data.csv', header=0, index_col=0)
# print(series.head())
# series.plot()
# pyplot.grid()
# pyplot.show()

# Step 2: Check correlation 
# Option 2.1: Check by lag_plot
# Due to the same value, many point is in the same position
# from pandas.plotting import lag_plot
# series = read_csv('src/data/mock_data.csv', header=0, index_col=0)
# lag_plot(series)
# pyplot.show()

# Option 2.2: Check by Pearson
# from pandas import DataFrame
# from pandas import concat
# series = read_csv('src/data/mock_data.csv', header=0, index_col=0)
# values = DataFrame(series.values)
# dataframe = concat([values.shift(1), values], axis=1)
# dataframe.columns = ['t-1', 't+1']
# result = dataframe.corr()
# print(result)

# Step 3: Autoregresion Plot
# from pandas.plotting import autocorrelation_plot
# series = read_csv('src/data/mock_data.csv', header=0, index_col=0)
# autocorrelation_plot(series)
# pyplot.show()

# and
# from statsmodels.graphics.tsaplots import plot_acf
# series = read_csv('src/data/mock_data.csv', header=0, index_col=0)
# plot_acf(series, lags=60)
# pyplot.show()

# Step 4
# Option 4.1: Persistence Model
# from pandas import DataFrame
# from pandas import concat
# from sklearn.metrics import mean_squared_error
# series = read_csv('src/data/mock_data.csv', header=0, index_col=0)
# # create lagged dataset
# values = DataFrame(series.values)
# dataframe = concat([values.shift(1), values], axis=1)
# dataframe.columns = ['t-1', 't+1']
# # split into train and test sets
# X = dataframe.values
# train, test = X[1:len(X)-7], X[len(X)-7:]
# train_X, train_y = train[:,0], train[:,1]
# test_X, test_y = test[:,0], test[:,1]

# # persistence model
# def model_persistence(x):
# 	return x

# # walk-forward validation
# predictions = list()
# for x in test_X:
# 	yhat = model_persistence(x)
# 	predictions.append(yhat)
# test_score = mean_squared_error(test_y, predictions)
# print('Test MSE: %.3f' % test_score)
# # plot predictions vs expected
# pyplot.plot(test_y)
# pyplot.plot(predictions, color='red')
# pyplot.show()

# Option 4.2: Autoregressive model
from statsmodels.tsa.ar_model import AutoReg
from sklearn.metrics import mean_squared_error
from math import sqrt
# load dataset
series = read_csv('src/data/om18.csv', header=0, index_col=0, parse_dates=True, squeeze=True)
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
	print('predicted=%d, expected=%d' % (yhat, obs))
rmse = sqrt(mean_squared_error(test, predictions))
# print('Test RMSE: %d' % rmse)

# Show line chart
# pyplot.plot(test)												# Thực tế
# pyplot.plot(predictions, color='red')		# Dự báo
# pyplot.title("Biểu đồ dự báo giá lúa")
# pyplot.xlabel("Ngày")
# pyplot.ylabel("Giá lúa (đồng/kg)")
# pyplot.show()
