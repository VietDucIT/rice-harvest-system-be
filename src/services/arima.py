from pandas import read_csv
from datetime import datetime
from matplotlib import pyplot
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error
from pandas.plotting import autocorrelation_plot
from math import sqrt

def parser(x):
	return datetime.strptime(x, '%d/%m/%Y')

series = read_csv('src/data/om5451.csv', header=0, parse_dates=[0], index_col=0, date_parser=parser)
# series = read_csv('src/data/om18.csv', header=0, parse_dates=[0], index_col=0, date_parser=parser)
# series = read_csv('src/data/ir504.csv', header=0, parse_dates=[0], index_col=0, date_parser=parser)
# series = read_csv('src/data/daiThom8.csv', header=0, parse_dates=[0], index_col=0, date_parser=parser)
series.squeeze('columns')

# # Load data
# series.plot()
# pyplot.title('Biểu đồ giá lúa OM 5451')
# # pyplot.title('Biểu đồ giá lúa OM 18')
# # pyplot.title('Biểu đồ giá lúa IR 504')
# # pyplot.title('Biểu đồ giá lúa Đài Thơm 8')
# pyplot.xlabel('Ngày')
# pyplot.ylabel('Giá lúa (đồng/kg)')
# pyplot.legend()
# pyplot.show()



# # Check autocorrelation
# autocorrelation_plot(series)
# pyplot.title('Biểu đồ sự tự tương quan')
# pyplot.show()



# # choose ARIMA(p,d,q)
# # Determine d: due to the time series is unstationary, d must be greater than 0, choose from 1, 2
# # Determine p: usually p <= 5. Try to loop and see that the greater p is, the greater AIC is. Meanwhile, we need the smallest AIC
# # Determine q: similar p
# series.index = series.index.to_period('D')
# X = series.values

# def _arima_fit(orders, data):
#   models = dict()
#   for order in orders:
#     model = ARIMA(data, order = order).fit()
#     model_name = 'ARIMA({},{},{})'.format(order[0], order[1], order[2])
#     print('{} --> AIC={}'.format(model_name, model.aic))
#     # print('{} --> AIC={}; BIC={}'.format(model_name, model.aic, model.bic))
#     models[model_name] = model
#   return models

# ordersP = [(0,1,0),(1,1,0),(2,1,0),(3,1,0),(4,1,0),(5,1,0),(12,1,0)]
# # # ordersQ = [(4,1,0),(4,1,1),(4,1,2),(4,1,3),(4,1,4),(4,1,5)]
# models = _arima_fit(ordersP, X)



# # Forecast for next 7 days
# series.index = series.index.to_period('D')
# X = series.values
# history = [x for x in X]
# # walk-forward validation
# for i in range(7):
#   model = ARIMA(history, order=(12,1,0))
#   model_fit = model.fit()
#   output = model_fit.forecast()
#   yhat = output[0]
#   diff = yhat - history[-1]
#   history.append(history[-1] + diff)
#   print('Day %d: %.0f' % (i+1, yhat))




# ARIMA model with Rolling Forecast
series.index = series.index.to_period('D')
X = series.values
# split into train and test sets
size = len(X) - 30
train, test = X[0:size], X[size:len(X)]
history = [x for x in train]
predictions = list()

# walk-forward validation
for t in range(len(test)):
	model = ARIMA(history, order=(12,1,0))
	model_fit = model.fit()
	output = model_fit.forecast()
	yhat = output[0]
	predictions.append(yhat)
	obs = test[t]
	history.append(obs)
	print('Predicted = %.0f, Expected = %.0f' % (yhat, obs))

# evaluate forecasts
rmse = sqrt(mean_squared_error(test, predictions))
print('Test RMSE: %.0f' % rmse)

# plot forecasts against actual outcomes
pyplot.plot(test, label='Thực tế')
pyplot.plot(predictions, color='red', label='Dự báo')
pyplot.title('Biểu đồ dự báo giá lúa OM 5451')
# pyplot.title('Biểu đồ dự báo giá lúa OM 18')
# pyplot.title('Biểu đồ dự báo giá lúa IR 504')
# pyplot.title('Biểu đồ dự báo giá lúa Đài Thơm 8')
pyplot.xlabel('Ngày')
pyplot.ylabel('Giá lúa (đồng/kg)')
pyplot.legend()
pyplot.show()
