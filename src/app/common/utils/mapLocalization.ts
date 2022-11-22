import {RoadNode, RoadSegment} from "../../services/generated";


interface StrokeOptions{
  color: string,
  opacity: number,
  weight: number
}

interface MarkerOptions{

}

export function segmentsToGooglePolylineArr(segments: RoadSegment[], strokeOptions: StrokeOptions){

  const arr: any[] = [];

  segments.forEach(segment => {
    const start = roadNodeParsed(segment.startNode);
    const end = roadNodeParsed(segment.endNode);

    arr.push(new google.maps.Polyline({
      path: [{lat: start.lat, lng: start.lng}, {lat: end.lat, lng: end.lng}], geodesic: true,
      strokeColor: strokeOptions.color, strokeOpacity: strokeOptions.opacity, strokeWeight: strokeOptions.weight
    }))
  });

  return arr;
}

export function roadNodeParsed(node: RoadNode){
  return {
    lat: parseFloat(node.localization.latitude),
    lng: parseFloat(node.localization.longitude)
  }
}


export function segmentsToGoogleMarkersArr(segments: RoadSegment[], markerOptions: MarkerOptions){

  const arr: any[] = [];

  const roadNodes: Set<RoadNode> = new Set<RoadNode>();

  segments.forEach(seg => {
    roadNodes.add(seg.endNode);
    roadNodes.add(seg.startNode);
  });


  roadNodes.forEach(roadNode => {
    const point = roadNodeParsed(roadNode);
    arr.push(new google.maps.Marker({
      position: {lat: point.lat, lng: point.lng},
      title: roadNode.name
    }));
  });

  return arr;
}

export function getFitBounds(markers: google.maps.Marker[]) {
  const bounds = new google.maps.LatLngBounds();
  markers.forEach(marker => {
    const newLatLng = new google.maps.LatLng(marker.getPosition()?.lat()!, marker.getPosition()?.lng()!);
    bounds.extend(newLatLng);
  });
  return bounds;
}
