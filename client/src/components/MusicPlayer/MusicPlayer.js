import './MusicPlayer.css';

// Constants
import Soundtracks from "../../constants/Soundtracks";
import Regions from "../../constants/Regions";

// MUI Components
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';

// MUI Icons
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CloseIcon from '@mui/icons-material/Close';

// React and Redux
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../redux/actions/allActions';

const MusicPlayer = ({ region, track }) => {
    const [playing, setPlaying] = useState(false);
    const [regionNumber, setRegionNumber] = useState(region);
    const [trackNumber, setTrackNumber] = useState(track);
    const [songSRC, setSongSRC] = useState();
    const [player, setPlayer] = useState();

    const music = useSelector(state => state.musicReducer);
    const dispatch = useDispatch()

    const changeVolume = (_, volume) => {
        let player = document.getElementById("Music-audio");
        player.volume = volume;
    }

    const playPause = () => {
        setPlaying(!playing);
        playing ? player.pause() : player.play();
    }

    const nextSong = () => {
        trackNumber === 6 ? setTrackNumber(0) : setTrackNumber(trackNumber + 1);
    }

    const prevSong = () => {
        trackNumber === 0 ? setTrackNumber(6) : setTrackNumber(trackNumber - 1);
    }

    const nextRegion = () => {
        regionNumber === 6 ? setRegionNumber(0) : setRegionNumber(regionNumber + 1);
        setTrackNumber(0);
    }

    const prevRegion = () => {
        regionNumber === 0 ? setRegionNumber(6) : setRegionNumber(regionNumber - 1);
        setTrackNumber(0);
    }

    useEffect(() => {
        setSongSRC(Soundtracks[Regions[regionNumber]][trackNumber]["file_path"]);
        if (player) {
            player.pause();
            player.load();
            player.play().catch(_ => {});
            setPlaying(true);
        }
    }, [trackNumber, regionNumber]);

    useEffect(() => {
        let player = document.getElementById("Music-audio");
        if (player === null) return;

        player.volume = "0.1";
        player.pause();
        setPlayer(player);
        setPlaying(false);
    }, []);

    return (
        <Card id="Music-player" className="flex-col" style={music.closed === false ? {width: "200px", padding: "4px 20px"} : {borderRadius: "100%", width: "32px", height: "32px", padding: "0px"}}>
            <audio id="Music-audio" onEnded={() => nextSong()}>
                <source src={songSRC} type="audio/mp3"></source>
            </audio>
            <Tooltip title={music.closed === false ? "Close Player" : "Open Player"} placement="top" style={music.closed === false ? {position: "absolute", top: "0", right: "0"} : {width: "100%"}} arrow>
                {music.closed === false ? 
                <IconButton onClick={() => dispatch(allActions.musicActions.close())}>
                    <CloseIcon style={{padding: "0px", width: "16px", height: "16px", color: "red"}}></CloseIcon>
                </IconButton> :                 
                <IconButton onClick={() => dispatch(allActions.musicActions.open())}>
                    <MusicNoteIcon style={{padding: "0px", width: "16px", height: "16px", color: "black"}}></MusicNoteIcon>
                </IconButton>}
            </Tooltip>
            {music.closed === false ? <Typography style={{padding: "0px 8px", margin: "auto", width: "160px", height: "20px", overflow: "hidden", textOverflow: "ellipsis", textAlign: "center"}}>{Soundtracks[Regions[regionNumber]][trackNumber]["name"]}</Typography> : null}
            {music.closed === false ? 
            <div className="flex" style={{width: "fit-content", margin: "auto"}}>
                <Tooltip title="Previous Region" placement="top" arrow>
                    <IconButton onClick={() => prevRegion()}>
                        <ArrowLeftIcon style={{fontSize: "2rem"}}></ArrowLeftIcon>
                    </IconButton>  
                </Tooltip>             
                <Typography id="Song-Name" style={{padding: "4px 8px 0px 8px", margin: "auto", textTransform: "capitalize"}}>{Regions[regionNumber]}</Typography>
                <Tooltip title="Next Region" placement="top" arrow>
                    <IconButton onClick={() => nextRegion()}>
                        <ArrowRightIcon style={{fontSize: "2rem"}}></ArrowRightIcon>
                    </IconButton>  
                </Tooltip> 
            </div> : null}
            {music.closed === false ? <Slider size="small" defaultValue={0.1} step={0.01} min={0.00} max={1.00} onChange={changeVolume} style={{width: "80%", margin: "auto"}}></Slider> : null}
            {music.closed === false ?             
            <div className="flex" style={{margin: "0px auto"}}>
                <Tooltip title="Previous Song" placement="top" arrow>
                    <IconButton aria-label="previous" onClick={() => prevSong()}>
                        <SkipPreviousIcon></SkipPreviousIcon>
                    </IconButton>
                </Tooltip>
                <Tooltip title={playing === true ? "Pause" : "Play"} placement="top" arrow>
                    <IconButton aria-label="play/pause" onClick={() => playPause()}>
                        {playing === true ? <PauseIcon></PauseIcon> : <PlayArrowIcon></PlayArrowIcon>}
                    </IconButton>
                </Tooltip>
                <Tooltip title="Next Song" placement="top" arrow>
                    <IconButton aria-label="next" onClick={() => nextSong()}>
                        <SkipNextIcon></SkipNextIcon>
                    </IconButton>
                </Tooltip>
            </div> : null}
        </Card>
    )
}

export default MusicPlayer;