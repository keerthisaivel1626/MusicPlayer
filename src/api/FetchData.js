import React from 'react'
import { View, Text } from 'react-native'

const FetchData= (props) => {
 const [text, setText] = useState('');
 const [data, setData] = useState(null);
 const [trending, setTrending] = useState(null);
 const [album, setAlbum] = useState(null);
 const [playlist, setPLaylist] = useState(null);
 const [radio, setRadio] = useState(null);
 const [discover, setDiscover] = useState(null);
 const [city, setCity] = useState(null);
useEffect(() => {
   
    return () => {
      getTrending(); 

    }
}, [])
    const getTrending = async () => {
      const res = await fetch('https://saavn.me/home');
      const data = await res.json();
      setTrending(data.results.new_trending);
      setAlbum(data.results.new_albums);
      setPLaylist(data.results.top_playlists);
      setRadio(data.results.radio);
      setDiscover(data.results.browse_discover);
      setCity(data.results.city_mod);
    };


    return (
      <>

      </>
    )
}

export default FetchData
