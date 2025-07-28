import { Request, Response } from 'express';

export const getLocation = async (req: Request, res: Response)=> {  
  console.log(req); 
  const input = req.query.input; 
  
  const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyB-ssWyB19Ujf-ZlbXjrhuoIz66tFl1OOw&language=en`);
  const data = await response.json();
  console.log(data);
  res.json(data);
}
export const getDirectionByPlace = async (req: Request, res: Response)=> {  
  console.log(req); 
  const sourcePlaceId = req.query.sourcePlaceId; 
  const destinationPlaceId = req.query.destinationPlaceId; 
  const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${sourcePlaceId}&destination=${destinationPlaceId}&key=${'AIzaSyB-ssWyB19Ujf-ZlbXjrhuoIz66tFl1OOw'}`);
  const data = await response.json();
  console.log(data);
  res.json(data);
}
export const reverseGeocode = async (req: Request, res: Response)=> {  
  console.log(req); 
  const lat = req.query.lat; 
  const lng = req.query.lng; 
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${'AIzaSyB-ssWyB19Ujf-ZlbXjrhuoIz66tFl1OOw'}`);
  const data = await response.json();
  console.log(data);
  res.json(data);
}
