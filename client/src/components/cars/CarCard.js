import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 620,
  },
  media: {
    height: 300,
  },
});

export default function CarCard(props) {
  //console.log(props)
  const classes = useStyles();
  const buttons = props.isAdmin ? 
  (<div>
    <Button size="small" color="primary" onClick={()=>{props.handleDelete(props.car._id)}}> Supprimer</Button>
    <Button size="small" color="primary" onClick={()=>{props.handleOpen(props.car._id)}}> Modifier</Button>
    </div>) : (
    <Button size="small" color="primary">
      Réserver
    </Button>)
      const adminDetails = props.isAdmin ? <div>{props.car.feesPerDay}</div> : <div></div>
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.car.imageUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.car.brand} {props.car.model} {props.car.year}
            <h5>{props.car.feesPerDay}</h5>
          </Typography>
        {adminDetails}
        </CardContent>
      </CardActionArea>
      <CardActions>
      {buttons}
      </CardActions>
    </Card>
  );
}