import './App.css';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import data from './data';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PauseIcon from '@mui/icons-material/Pause';
import { useEffect, useState } from 'react';

function App() {

  const [activeItem, setActiveItem] = useState(0)
  const len = data.length - 1
  const [changeBtn, setChangeBtn] = useState(true)
  
  useEffect(()=>{
    if(changeBtn == true){
      const interval = setInterval(()=>{
        setActiveItem(activeItem === len ? 0 : activeItem + 1)
      }, 3000)
     return () => clearInterval(interval)
    }
  }, [activeItem, changeBtn])

  return (
    <div className="App">
      <Grid container className='main_grid'>
        <span className='arrow left_arrow' onClick={() => setActiveItem(activeItem == 0 ? len : activeItem - 1)}><ArrowBackIosIcon style={{ fontSize: "20px" }} /></span>
        <span className='arrow right_arrow' onClick={() => setActiveItem(activeItem == len ? 0 : activeItem + 1)}><ArrowForwardIosIcon style={{ fontSize: "20px" }} /></span>

        <Grid item className='img_grid' xs={12} md={7}>
          {
            data.map((item, index) => (
              <Box
                component="img"
                key={index}
                sx={{
                  height: "80%",
                  width: "100%",
                }}
                alt="The house from the offer."
                src={item.url}
                style={{ borderRadius: "20px" }}
                className={index == activeItem ? "active" : "inactive"}
              />
            ))
          }

          <Grid item className='small_img_grid'>

            {
              data.map((item, index) => (
                <div style={{ height: "90%", width: "20%" }} key={index} onClick={()=>setActiveItem(index)}>
                  <Box
                    component="img"
                    alt="The house from the offer."
                    src={item.url}
                    className={index == activeItem ? "nograyscale" : "grayscale"}
                  />
                </div>
              ))
            }
          </Grid>
        </Grid>
        <Grid item xs={11} className="content_grid" md={5}>
          {
            data.map((item, index) => (
              <div className={index == activeItem ? "active" : "inactive"} key={index}>
                <div className='content_div'>
                <Grid item className=' text_grid'>
                  <Typography variant='h4' >
                    {item.title}
                  </Typography>
                  <Typography variant='p' style={{ fontSize: "12px"}}>
                   {item.description}
                  </Typography>
                </Grid>
                <Grid item className='icon_div'>
                  <span onClick={()=>setChangeBtn(!changeBtn)}>{changeBtn ==true ? <PlayArrowIcon style={{ fontSize: "28px" }} />:<PauseIcon  style={{ fontSize: "28px" }}/>}</span>
                </Grid>
                </div>
                
              </div>
            ))
          }
        </Grid>

      </Grid>
    </div>
  );
}

export default App;
