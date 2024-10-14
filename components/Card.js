export default function Card({ suit, value }) {
    const color = suit === '♥' || suit === '♦' ? 'red' : 'black';
  
    return (
      <div className="card">
        <div className="card-value">{value}</div>
        <div className="card-suit">{suit}</div>
        <style jsx>{`
          .card {
            width: 60px;
            height: 90px;
            background-color: white;
            border: 1px solid black;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 5px;
            margin: 5px;
            color: ${color};
          }
          .card-value {
            font-size: 20px;
            align-self: flex-start;
          }
          .card-suit {
            font-size: 24px;
            align-self: center;
          }
        `}</style>
      </div>
    );
  }