import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import PropTypes from "prop-types";
import MapStyleOptions from './json/MapStyleOptions.json';
import * as fourSquareAPI from './APIs/fourSquareAPI.js';

/**
*Google Maps Container implemented with google-maps-react library
*/

class Mapcontainer extends Component {

  state = {
    bounds: {},
    infoWindowVisible: false,
    likes: '',
    photo: '',
    activeMarker: {}
  }

//Used to open the infoWindow and load FourSquare info
  onMarkerClick = (markerProperties, markerReference) =>{
    this.setState({
      activeMarker: markerReference,
      infoWindowVisible: true,
      likes: 'Loading likes',
      photo: 'Loading photo'
    });
    this.getFourSquareInfo(markerProperties.position.lat, markerProperties.position.lng,markerProperties.title)
  }

  //Get FourSquare API info and error handling
  getFourSquareInfo = (lat,lng,name) => {
    return fourSquareAPI.getSearchResult(lat, lng, name).then(venueId => {
      if(venueId ==='error' )
        this.setState({
            likes: 'Error loading Content',
            photo: 'error'
        });
       else {
        fourSquareAPI.getDetails(venueId).then(response => {
          if(response === 'error' || response.meta.code !== 200)
            this.setState({
              likes: 'Error loading content',
              photo: 'error'
            });
          else{
            if('likes' in response.response.venue)
              this.setState({likes: response.response.venue.likes.summary});
            else
              this.setState({likes: 'Error loading content'});
            if('bestPhoto' in response.response.venue)
             this.setState({photo: response.response.venue.bestPhoto.prefix+'150'+response.response.venue.bestPhoto.suffix});
            else
              this.setState({photo:'error'});
          }
        })
      }
    })
  }

//Bounds set to display all markers within the google maps container upon mounting componenent
  setBounds = () => {
    let bounds = new this.props.google.maps.LatLngBounds();
    for (let i = 0; i < this.props.placesToDisplay.length; i++)
        bounds.extend(this.props.placesToDisplay[i].location);
    this.setState({bounds})
  }

  componentDidMount(){
   this.setBounds();
  }

//Open corresponding marker when a place on the side list is selected 
  getSnapshotBeforeUpdate(){
      if(this.props.placeSelected !== ''){
      this.setState({
        activeMarker:this.refs[this.props.placeSelected].marker,
         infoWindowVisible: true,
         likes:'Loading likes',
         photo:'Loading photo'
      });

      this.getFourSquareInfo(
        this.refs[this.props.placeSelected].props.position.lat,
        this.refs[this.props.placeSelected].props.position.lng,
        this.refs[this.props.placeSelected].props.title
      )
       this.props.selectPlace('')
    }
    return null;
  }

  componentDidUpdate(){
    return null;
  }

render(){
    return (

      <Map
        google={this.props.google}
        bounds={this.state.bounds}
        styles={MapStyleOptions} //load style options from json file.
        onClick={() => {this.setState({activeMarker: {},infoWindowVisible: false})}}
        ref={'map'}
        style={{width:this.props.mapWidth}}
        center={this.state.centre}
      >
        {this.props.placesToDisplay.map((markerInfo, index) =>
          <Marker
              ref={markerInfo.title}
              position={{lat: markerInfo.location.lat, lng: markerInfo.location.lng}}
              key={index}
              title={markerInfo.title}
              onClick={this.onMarkerClick}
              onMouseout={this.mouseMoveOutOfMarker}
              animation={this.state.activeMarker.title === markerInfo.title ? this.props.google.maps.Animation.BOUNCE : null  }
              icon={{ url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|00aced|40|_|%E2%80%A2', scaledSize: new this.props.google.maps.Size(30, 45)}}
           />
        )}
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={() => this.setState({ infoWindowVisible: false})}
          visible={this.state.infoWindowVisible} >
            <div
              className="info-window-content"
              aria-label={`InfoWindow on ${this.state.activeMarker.title}`}
             >
              <h2 tabIndex="0" style={{textAlign:'center'}}>
               {this.state.activeMarker.title}
              </h2>
              {this.state.photo ==='Loading photo' ?
                <h3  tabIndex="0" style={{textAlign:'center'}}>Loading photo</h3> :
                this.state.photo ==='error' ?
                <h3  tabIndex="0" style={{textAlign:'center'}}>Photo could not load</h3> :
                <div style={{textAlign:'center'}}>
                  <img  tabIndex="0"   src={this.state.photo}   alt={this.state.activeMarker.title + ' photo'}/>
                </div>}
              <h3 tabIndex="0"  style={{textAlign:'center'}}>{this.state.likes}</h3>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default  GoogleApiWrapper({
  apiKey:'AIzaSyBSPBFl-6_iRO2cymAwR-MVP-gkvIl64FU'
})(Mapcontainer)

Mapcontainer.propTypes = {
  placesToDisplay: PropTypes.array.isRequired,
  placeSelected: PropTypes.string.isRequired,
  selectPlace: PropTypes.func.isRequired
}