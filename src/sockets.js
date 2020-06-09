const signalR = require("@aspnet/signalr");
const URL_SOCKETS = 'http://sockets.myapp.ws';
const TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg0RkE4QzU4OUNBNDQxNEJCNEIzNzdGQkVBRkMzQUI1QkRDMUMzMUMiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJoUHFNV0p5a1FVdTBzM2Y3NnZ3NnRiM0J3eHcifQ.eyJuYmYiOjE1OTE3MzAyMzEsImV4cCI6MTU5MTgxNjYzMSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5teWFwcC53cyIsImF1ZCI6WyJodHRwczovL2lkZW50aXR5Lm15YXBwLndzL3Jlc291cmNlcyIsImFwaTEiXSwiY2xpZW50X2lkIjoiYXBpMSIsInN1YiI6ImE3NjkyYWE2LTg1NjQtNDRmNS1hOTdlLTAzYTY0YzBkNzBhMiIsImF1dGhfdGltZSI6MTU5MTczMDIzMSwiaWRwIjoibG9jYWwiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYTc2OTJhYTYtODU2NC00NGY1LWE5N2UtMDNhNjRjMGQ3MGEyIiwic2NvcGUiOlsib3BlbmlkIiwiYXBpMSJdLCJhbXIiOlsicHdkIl19.aGwdsKcaPEmzgrGQkdWn4dBXO_xnvpzLeepH8CNpleHXdJ-ZNFjQh_Dsey5UnCay-aBg3u-1VDjXAByudNMHLt7qRcXQa5rtYQOjn2Mb8E6vIdNy0knJnTBskQVhKb-cSCSd9HdBPQem0yOBEAmDNCy0OzkqhsPoNlfXRyJtI88BLYVqZEBrn2j1uda9aA4fwUpzBZLp4zE8ycD3E_-MQgXrlLKsAloxt1ULNjYty8dJdIXUskpIhqhr4p17NeBrdN6LD3Zmi148NkawRsFZUmVqrEvXcyVMhiw_jB5mfx1cXmLT1JkD-3qEVuf7E7xsZqmvW_cQQs-3Tx1TxQ4G7g';

export const hubConnection = new signalR.HubConnectionBuilder()
.withUrl(`${URL_SOCKETS}/sr/orders`, {accessTokenFactory: () => TOKEN})
.configureLogging(signalR.LogLevel.Information)
.build();

hubConnection.start()
.then(() => {
	console.log('hubConnection started')
}).catch(error => {
	console.log(error)
});

export const hubConnectionChat = new signalR.HubConnectionBuilder()
.withUrl(`${URL_SOCKETS}/sr/chat`, {accessTokenFactory: () => TOKEN})
.configureLogging(signalR.LogLevel.Information)
.build();

setInterval(function () {
	hubConnection
	.invoke('KeepAlive', '')
	.catch(err => console.log("hubConnection KeepAlive Error: " + err));

	hubConnectionChat
	.invoke('KeepAlive', '')
	.catch(err => console.log("hubConnectionChat KeepAlive Error: " + err));
}, 60000);