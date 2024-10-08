# Vest Fullstack Take Home Assignment - Social Trading

Vest Labs is a quantitative crypto research firm building a Vest Exchange - a highly capital efficient perpetual futures exchange that uses zero-knowledge proofs to ensure the fairest pricing for traders and liquidity providers.

As part of our team, you will be at the forefront of innovation, developing and testing groundbreaking ideas with real users. One of our early initiatives focuses on enhancing social trading. Trading, by nature, is a highly social activity, and the candlestick chart is a visual representation of the collective beliefs, ideologies, and emotions of market participants.

In this takehome assignment, you will be tasked with creating a frontend application that allows users to add emoji reactions to a live TradingView chart by dragging and dropping emojis from a sidebar onto the chart. These reactions will be stored in a backend state and displayed on the corresponding candlesticks.

### Objective

1. Recreate the following [Figma design](https://www.figma.com/design/Y0xGAiudDKFthVWTLnyWCT/Frontend-Takehome-Assignment?node-id=0-1&t=hmfOm6qYW2aRQwdN-1).

2. Display the candlestick chart for ETH-PERP that fetches (REST) and streams (WS) 1 minute candlestick data in real time using the following APIs:

The REST endpoint is `https://serverprod.vest.exchange`

`GET /v1/ohlcv/klines`

Params (all required):
- symbol (e.g. "ETH-PERP")
- interval (supports 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M)
- startTime (nanoseconds since epoch)
- endTime (nanoseconds since epoch)
- countBack (number of bars to return from endTime)

Example query:
```https://serverprod.vest.exchange/v1/ohlcv/klines?symbol=ETH-PERP&interval=1m&startTime=1726161417000&endTime=1726179479000&countBack=302```

Example response (brotli encoded):
```
[
    [
        1726161300000.0, // open time
        144.1074, // open
        144.1718, // high
        144.052, // low
        144.1362, // close
        0.0, // volume
        1726161359999.0, // close time
        0.0, // quote volume
        0.0 // num of trades
    ],
    ...
]
```

The WS endpoint is `wss://wsprod.vest.exchange/ws-api?xwebsocketserver=restserver0&version=1.0`

Send the following JSON message to the server to subscribe to a candlesticks stream:
```
{
    "method": "SUBSCRIBE",
    "params": ["ETH-PERP@kline_1m"]
}
```

Example response (Brotli encoded):
```
{
    "channel": "ETH-PERP@kline_1m",
    "data": {
        "s": "ETH-PERP",
        "k": {
            "s": "ETH-PERP",
            "o": 145.65211,
            "h": 145.709
            "l": 145.5309
            "c": 145.6869,
            "v": 0.0
            "t": 172618026121,
            "i": "1m",
        }
    }
}
```

3. Enable users to add their live reactions to the candlestick chart. The user should be able to add emoji reactions by dragging and dropping emojis from a sidebar onto the chart. 

4.  **Bonus Points:**
  
    a. Animate successful trading when clicking “Buy” to include confetti and sound. [See example](https://drive.google.com/file/d/1BFJUZw83shYzdXBv9I1maoCMkaPRmkxW/view?usp=sharing)

        - [Sound File](https://drive.google.com/file/d/1N6gz4R2qZHrGnOzu49QUP95oQokKw6ID/view?usp=sharing)

    b. Include a dropdown to select for different markets
    c. Handle switching of time intervals

### Technical Specifications
- Use React for recreating the design.
- Use the mock Node.Js / Express backend server to retrieve / add emojis.
- Use TradingView's [`lightweight-charts`](https://github.com/tradingview/lightweight-charts) library for the candlestick chart (already included in `package.json`). Don't worry about matching the exact Figma design for the chart component since this library is a reduced version of what we use in production.

### Tips
- TradingView should already have client-side caching so you don't need to implement caching
- Ensure that WS messages are decoded correctly (they are Brotli compressed)

### Deliverables
- A zip file or a link to a Git repository containing:
    - The complete source code of the frontend application.
    - Instructions on how to set up and run the application locally.

### Evaluation Criteria:
- **Functionality**: Does the application meet the requirements?
- **Style / Design:** Does the application look similar to the presented Figma file?
- **Code Quality**: Is the code well-organized, readable, and maintainable?
- **Bonus Features**: Are any of the bonus features implemented?

### Submission:

Please submit your assignment to [max@vest.xyz](mailto:max@vest.xyz). If you have any questions or need clarifications, feel free to reach out.
