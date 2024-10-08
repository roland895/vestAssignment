import React from "react";


const EmojiOverlay = ({setDraggingEmoji}) =>{
  const availableEmojis = ['🦝', '🦆', '🔥', '💎', '🙃', '🐂']; // List of emojis

  return (

  <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                {availableEmojis.map((emoji) => (
                    <div
                        key={emoji}
                        draggable
                        onDragStart={() => setDraggingEmoji(emoji)} // Set the currently dragging emoji
                        style={{
                            fontSize: '30px',
                            cursor: 'grab',
                            userSelect: 'none',
                            padding: '4px',
                        }}
                    >
                        {emoji}
                    </div>
                ))}
            </div>
  )
}
export default EmojiOverlay