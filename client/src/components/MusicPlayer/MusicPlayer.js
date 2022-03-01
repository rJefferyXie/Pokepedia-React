import './MusicPlayer.css';

import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';

import Soundtracks from "../Constants/Soundtracks";

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import React, { useState, useEffect } from 'react'

const MusicPlayer = () => {
    const [playing, setPlaying] = useState(false);
    const [regionNumber, setRegionNumber] = useState(0);
    const [trackNumber, setTrackNumber] = useState(0);

    const regions = {
        0: "johto",
        1: "kanto",
        2: "hoenn",
        3: "sinnoh",
        4: "unova",
        5: "kalos",
        6: "alola"
    }

    const nextSong = () => {
        if (trackNumber === 6) {
            setTrackNumber(0);
        } else {
            setTrackNumber(trackNumber + 1);
        }
    }

    const prevSong = () => {
        if (trackNumber === 0) {
            setTrackNumber(6);
        } else {
            setTrackNumber(trackNumber - 1);
        }
    }

    const playPause = () => {
        let player = document.getElementById("Music-audio");
        setPlaying(!playing);
        if (playing) {
            player.pause();
        } else {
            player.play();
        }
    }

    const nextRegion = () => {
        if (regionNumber === 6) {
            setRegionNumber(0);
        } else {
            setRegionNumber(regionNumber + 1);
        }
        setTrackNumber(0);
    }

    const prevRegion = () => {
        if (regionNumber === 0) {
            setRegionNumber(6);
        } else {
            setRegionNumber(regionNumber - 1);
        }
        setTrackNumber(0);
    }

    useEffect(() => {
        let player = document.getElementById("Music-audio");
        player.play();
        setPlaying(true);
    }, [trackNumber, regionNumber]);

    useEffect(() => {
        setRegionNumber(Math.floor(Math.random() * 7));
        setTrackNumber(Math.floor(Math.random() * 7));
        let player = document.getElementById("Music-audio");
        player.addEventListener("ended", nextSong);
    }, []);

    return (
        <Card id="Music-player" className="flex-col" style={{width: "240px"}}>
            <audio id="Music-audio" src={Soundtracks[regions[regionNumber]][trackNumber]["file_path"]}></audio>
            <Typography style={{padding: "4px 8px 0px 8px", margin: "auto"}}>{Soundtracks[regions[regionNumber]][trackNumber]["name"]}</Typography>
            <div className="flex" style={{width: "fit-content", margin: "auto"}}>
                <Tooltip title="Previous Region" placement="top" arrow>
                    <IconButton onClick={() => prevRegion()}>
                        <ArrowLeftIcon></ArrowLeftIcon>
                    </IconButton>  
                </Tooltip>             
                <Typography style={{padding: "4px 8px 0px 8px", margin: "auto", textTransform: "capitalize"}}>{regions[regionNumber]}</Typography>
                <Tooltip title="Next Region" placement="top" arrow>
                    <IconButton onClick={() => nextRegion()}>
                        <ArrowRightIcon></ArrowRightIcon>
                    </IconButton>  
                </Tooltip> 
            </div>
            <Slider size="small" style={{width: "80%", margin: "auto"}}></Slider>
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
            </div>
        </Card>
    )
}

export default MusicPlayer;