from pandas import read_csv
from datetime import datetime
from statsmodels.tsa.arima.model import ARIMA

def parser(x):
	return datetime.strptime(x, '%d/%m/%Y')

### FOR DAI THOM 8
series_DT8 = read_csv('src/data/daiThom8.csv', header=0, parse_dates=[0], index_col=0, date_parser=parser)
series_DT8.squeeze('columns')
series_DT8.index = series_DT8.index.to_period('D')
X_DT8 = series_DT8.values
history_DT8 = [x for x in X_DT8]
print('DAI THOM 8 PREDICTION')
for i in range(7):
  model_DT8 = ARIMA(history_DT8, order=(12,1,0))
  model_fit = model_DT8.fit()
  output = model_fit.forecast()
  yhat = output[0]
  diff = yhat - history_DT8[-1]
  history_DT8.append(history_DT8[-1] + diff)
  print('Day %d: %.0f' % (i+1, yhat))



### FOR IR 504
series_IR504 = read_csv('src/data/ir504.csv', header=0, parse_dates=[0], index_col=0, date_parser=parser)
series_IR504.squeeze('columns')
series_IR504.index = series_IR504.index.to_period('D')
X_IR504 = series_IR504.values
history_IR504 = [x for x in X_IR504]
print('IR 504 PREDICTION')
for i in range(7):
  model_IR504 = ARIMA(history_IR504, order=(12,1,0))
  model_fit = model_IR504.fit()
  output = model_fit.forecast()
  yhat = output[0]
  diff = yhat - history_IR504[-1]
  history_IR504.append(history_IR504[-1] + diff)
  print('Day %d: %.0f' % (i+1, yhat))



### FOR OM 18
series_OM18 = read_csv('src/data/om18.csv', header=0, parse_dates=[0], index_col=0, date_parser=parser)
series_OM18.squeeze('columns')
series_OM18.index = series_OM18.index.to_period('D')
X_OM18 = series_OM18.values
history_OM18 = [x for x in X_OM18]
print('OM 18 PREDICTION')
for i in range(7):
  model_OM18 = ARIMA(history_OM18, order=(12,1,0))
  model_fit = model_OM18.fit()
  output = model_fit.forecast()
  yhat = output[0]
  diff = yhat - history_OM18[-1]
  history_OM18.append(history_OM18[-1] + diff)
  print('Day %d: %.0f' % (i+1, yhat))



### FOR OM 5451
series_OM5451 = read_csv('src/data/om5451.csv', header=0, parse_dates=[0], index_col=0, date_parser=parser)
series_OM5451.squeeze('columns')
series_OM5451.index = series_OM5451.index.to_period('D')
X_OM5451 = series_OM5451.values
history_OM5451 = [x for x in X_OM5451]
print('OM5451 PREDICTION')
for i in range(7):
  model_OM5451 = ARIMA(history_OM5451, order=(12,1,0))
  model_fit = model_OM5451.fit()
  output = model_fit.forecast()
  yhat = output[0]
  diff = yhat - history_OM5451[-1]
  history_OM5451.append(history_OM5451[-1] + diff)
  print('Day %d: %.0f' % (i+1, yhat))
