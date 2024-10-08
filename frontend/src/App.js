import Header from './components/header/header';
import './App.css';
import ChartComponent from './components/chart/chart'
import TwoStepCheckout from './components/twostepCheckout/twoStepCheckout';
import TabSelect from './components/common/tabSelect';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState([]);
  const [priceFundTab, setPriceFundTab] = useState(0)
  const [socket, setSocket] = useState(null);
  const [emojis, setEmojis] = useState([]);
  const fetchInitialData = async () => {
    const endTime = Date.now() * 1000; //ms to nano
    const startTime = endTime - 60 * 60 * 1000; //ms to nano

    try {
      const response = await fetch(`https://serverprod.vest.exchange/v1/ohlcv/klines?symbol=ETH-PERP&interval=1m&startTime=${startTime}&endTime=${endTime}&countBack=30`);
      let initialData = await response.json();

      initialData = initialData.map((bar) => ({
        time: Math.floor(bar[0]/ 1000),
        open: bar[1],
        high: bar[2],
        low: bar[3],
        close: bar[4],
      }));

      setData(initialData)

    } catch (error) {
      console.error('Error fetching candlestick data', error);
    }
  };

  const setupWebSocket = () => {
    const ws = new WebSocket(`wss://wsprod.vest.exchange/ws-api?xwebsocketserver=restserver0&version=1.0`);

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      //subscribe
      ws.send(JSON.stringify({
        "method": "SUBSCRIBE",
        "params": ["ETH-PERP@kline_1m"]
      }));
    };

    ws.onmessage = async (message) => {
      try {
        const res = await message.data.text(); // Wait for the text to be ready
        const jsonData = JSON.parse(res);
          if(jsonData.data){
            const roundedTime = Math.floor(jsonData.data.k.t/1000);
            setData(prevData => {
              if(prevData[prevData.length-1]?.time ===  roundedTime){
                prevData[prevData.length-1] = {
                  time: roundedTime,
                  open: jsonData.data.k.o,
                  high: jsonData.data.k.h,
                  low: jsonData.data.k.l,
                  close: jsonData.data.k.c
                }
                return prevData 
              }else{
                return([
                  ...prevData,
                  {
                    time: roundedTime,
                    open: jsonData.data.k.o,
                    high: jsonData.data.k.h,
                    low: jsonData.data.k.l,
                    close: jsonData.data.k.c
                  }
                ])
              }
          });            
          

      }


    } catch (error) {
        console.error('Failed to decode Brotli-encoded WebSocket message:', error);
    }
        
    };

    ws.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(ws);
  };

  useEffect(()=> {
    fetchInitialData()
    setupWebSocket()
  } ,[])

  useEffect(()=>{
    console.log(data)
  }, [data])


  return (
    <div className="App">
      <Header/>
      <div className='price-fund-tab'>
        <TabSelect  tabs={["PRICE", "FUNDING"]} selectedIndex={priceFundTab} setIndex={setPriceFundTab} maxWidth={144} margin={16}/>

      </div>
      <div className='main'>
        <div className='two-col'>
          <ChartComponent data={data}/>

          <TwoStepCheckout open={data[data.length-1]?.open}/>
        </div>
      </div>
    </div>
    
  );
}

export default App;
