import './Stats.css';

export default function Stats(props) {
  return (
    <div className='stats'>
      <p className='stat'>Hours: { props.totals?.['hours'] }</p>
      <p className='stat'>Placements: { props.totals?.['placements'] }</p>
      <p className='stat'>Videos: { props.totals?.['videos'] }</p>
      <p className='stat'>Return Visits: { props.totals?.['return visits'] }</p>
      <p className='stat'>Studies: { props.totals?.['studies'] }</p>
    </div>
  ); 
}
