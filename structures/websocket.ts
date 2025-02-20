import React, { useState, useEffect, useRef } from 'react';

interface User {
    id: string;
    name: string;
}

interface Presence {
    userId: string;
    cursorPosition: number;
}

const CollaborativeTextEditor: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const [presence, setPresence] = useState<Presence[]>([]);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const socketRef = useRef<Websocket | null>(null);

    useEffect(() => {
        // Simulate fetching initial data and user presence
        setText('Welcome to the collaborative text editor!');
        setUsers([{ id: '1', name: 'Alice' }, { id: '2', name: 'Bob' }]);
        setPresence([{ userId: '1', cursorPosition: 0 }, { userId: '2', cursorPosition: 5 }]);

        const socket = new WebSocket('wss://localhost:8080');
        socketRef.current = socket;

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log(data);
        }

        return () => socket.close();

    }, []);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        // Simulate broadcasting the change to other users
        // In a real application, this would involve WebSocket or similar real-time communication
        if (socketRef.current) {
          socketRef.current.send(JSON.stringify({type: 'text', text: e.target.value}));
        }
    };

    const handleCursorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const cursorPosition = e.target.selectionStart;
        // Simulate updating the user's cursor position
        // In a real application, this would involve WebSocket or similar real-time communication
    };

    return (
        <div>
            <textarea
                ref={textAreaRef}
                value={text}
                onChange={handleTextChange}
                onSelect={handleCursorChange}
                style={{ width: '100%', height: '300px' }}
            />
            <div>
                <h3>Users Present:</h3>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CollaborativeTextEditor;