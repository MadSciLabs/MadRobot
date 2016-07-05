from socketIO_client import SocketIO, LoggingNamespace

def on_time_response(*args):
    print('on_time_response', args)

socketIO = SocketIO('localhost', 5000, LoggingNamespace)

# Listen
socketIO.on('time', on_time_response)
socketIO.wait()

# Stop listening
socketIO.off('time')
#socketIO.wait(seconds=1)

