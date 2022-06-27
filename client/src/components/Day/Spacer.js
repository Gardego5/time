import './Day.css'

export default function Spacer(props) {
  return (
    <div
      className='day'
      style={{
        gridColumn: `span ${props.days}`
      }}></div>
  );
}
