import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";
import { EmojiPlugin } from './EmojiPlugin';
import EmojiOverlay from './emojiOverlay';
import useEmojiReactions from '../../hooks/useEmojiReactions';
import './chart.css';

const ChartComponent = (props) => {
  const {
    data,
    colors: {
      backgroundColor = "white",
      lineColor = "#2962FF",
      textColor = "black",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
  } = props;

  const { emojiReactions, loading, error, addReaction } = useEmojiReactions();
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const [draggingEmoji, setDraggingEmoji] = useState(null); // Track which emoji is being dragged
  const emojiPluginRef = useRef(null); // To store the emoji plugin instance
  const seriesRef = useRef();

  const handleEmojiDrop = (event) => {
    const chartBoundingRect = chartContainerRef.current.getBoundingClientRect();
    const x = event.clientX - chartBoundingRect.left;
    const y = event.clientY - chartBoundingRect.top;

    // Convert pixel position to time (x-axis) using chart coordinates

    if (draggingEmoji) {
        // We are going to retrieve the timestamp on the chart where the emoji was dragged and then find the closest bar relative to that point and use that as the final timestamp
        const logicalTime = chartRef.current.timeScale().coordinateToLogical(x);
        const bar = seriesRef.current.data()[logicalTime];
        // If we found a valid bar, we can now retrieve the time
        if (bar) {
          const timeAtDrop = bar.time;

          console.log('Closest bar time:', timeAtDrop);
          addReaction('Roland', timeAtDrop, draggingEmoji);
        }
       
        // emojiPluginRef.current.updateEmojis([emojiReactions, {
        //     xPosition: emojiReactions,
        //     yPosition: y,
        //     time: chartRef.current.timeScale().coordinateToTime(x),
        //     emoji: draggingEmoji,
        // }]);
        setDraggingEmoji(null); // Reset dragging emoji
    }
  };
  const handleResize = () => {
    chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
  };
  useEffect(()=>{
    if(emojiPluginRef.current){
      emojiPluginRef.current.updateEmojis(emojiReactions)
    }
  }, [emojiReactions])

  useEffect(() => {
  

    chartRef.current = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 551,
    });
    chartRef.current.timeScale().fitContent();

    const newSeries = chartRef.current.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });
    newSeries.setData(data);
    seriesRef.current = newSeries;
    emojiPluginRef.current = new EmojiPlugin(emojiReactions); // Instantiate the emoji plugin
    emojiPluginRef.current.updateEmojis(emojiReactions)

    newSeries.attachPrimitive(emojiPluginRef.current);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chartRef.current.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div className="chart-container">
    <div ref={chartContainerRef} 
      onDrop={handleEmojiDrop}
      onDragOver={(e) => e.preventDefault()} // Allow drop
    />
    <EmojiOverlay setDraggingEmoji={setDraggingEmoji}/> 
  </div>
  ;
};

export default ChartComponent;