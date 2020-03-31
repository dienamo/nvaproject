import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './CarCard.scss'

const useStyles = makeStyles({
  root: {
    maxWidth: 620,
  },
  media: {
    height: 250,
  },
});

export default function CarCard(props) {
  const classes = useStyles();
  const buttons = props.isAdmin ? 
  (<div>
    <Button size="small" color="primary" onClick={()=>{props.handleDelete(props.car._id)}}> Supprimer</Button>
    <Button size="small" color="primary" onClick={()=>{props.handleOpen(props.car._id)}}> Modifier</Button>
    </div>) : (
    <Button variant="contained" size="small" className='reservation-button'>
      Réserver
    </Button>)
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.car.imageUrl}
          title="Contemplative Reptile"
        />
        <CardContent style={{padding: '0px 16px'}}>
          <Typography>
            <h2 style={{margin: '0'}}>{props.car.brand} {props.car.model} {props.car.year} <br/></h2>
            <h3 style={{margin: '0'}}>{props.car.feesPerDay} fcfa/jour</h3>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      {buttons}
      </CardActions>
    </Card>
  );
}