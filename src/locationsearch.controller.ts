import { Request, Response } from 'express';
import { env } from 'process';

export const getLocation = async (req: Request, res: Response)=> {  
  console.log(req); 
  const input = req.query.input; 
  var url=`${process.env.GOOGLE_MAP_URL}place/autocomplete/json?input=${input}&key=${process.env.GOOGLE_API_KEY}&language=en`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  res.json(data);
}
export const getDirectionByPlace = async (req: Request, res: Response)=> {  
  console.log(req); 
  const sourcePlaceId = req.query.sourcePlaceId; 
  const destinationPlaceId = req.query.destinationPlaceId; 
  const response = await fetch(`${process.env.GOOGLE_MAP_URL}directions/json?origin=place_id:${sourcePlaceId}&destination=place_id:${destinationPlaceId}&key=${process.env.GOOGLE_API_KEY}`);
  const data = await response.json();
  console.log(data);
  res.json(data);
}
export const reverseGeocode = async (req: Request, res: Response)=> {  
  console.log(req); 
  const lat = req.query.lat; 
  const lng = req.query.lng; 
  var url=`${process.env.GOOGLE_MAP_URL}geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  res.json(data);
}
