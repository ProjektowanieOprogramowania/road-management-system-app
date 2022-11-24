import {Localization, RoadNode, RoadSegment} from "../../services/generated";


interface StrokeOptions {
  color: string,
  opacity: number,
  weight: number
}

interface MarkerOptions {

}

const preStrokeOptions: StrokeOptions = {
  color: '#FF0011',
  opacity: 0.8,
  weight: 3
}

export function segmentsToGooglePolylineArr(segments: RoadSegment[], strokeOptions?: StrokeOptions) {
  const arr: any[] = [];

  if (!strokeOptions) {
    strokeOptions = {...preStrokeOptions};
  }

  segments.forEach(segment => {
    const start = segment.startNode.localization;
    const end = segment.endNode.localization;

    arr.push(new google.maps.Polyline({
      path: [{lat: start.latitude, lng: start.longitude}, {lat: end.latitude, lng: end.longitude}],
      geodesic: true,
      strokeColor: strokeOptions!.color,
      strokeOpacity: strokeOptions!.opacity,
      strokeWeight: strokeOptions!.weight
    }))
  });

  return arr;
}

// export function roadNodeParsed(node: RoadNode) {
//   return {
//     lat: parseFloat(node.localization.latitude),
//     lng: parseFloat(node.localization.longitude)
//     // lat: node.localization.latitude,
//     // lng: node.localization.longitude
//   }
// }

export function segmentsToRoadNodes(segments: RoadSegment[]) {
  let roadNodesArr: RoadNode[] = [];
  segments.forEach(segments => {
    if (roadNodesArr.findIndex(o => o.name === segments.startNode.name) === -1) {
      roadNodesArr.push(segments.startNode);
    }

    if (roadNodesArr.findIndex(o => o.name === segments.endNode.name) === -1) {
      roadNodesArr.push(segments.endNode);
    }
  });

  return roadNodesArr;
}

export function segmentsToGoogleMarkersArr(segments: RoadSegment[], markerOptions: MarkerOptions) {

  const arr: any[] = [];

  const roadNodes = segmentsToRoadNodes(segments);

  roadNodes.forEach(roadNode => {
    const point = roadNode.localization;
    arr.push(new google.maps.Marker({
      position: {lat: point.latitude, lng: point.longitude},
      title: roadNode.name,
      ...markerOptions
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

export function positionToLocalization(position: google.maps.LatLng): Localization {
  return {
    latitude: position.lat(),
    longitude: position.lng()
  }
}

export function segmentToPolyline(segment: RoadSegment) {
  const start = segment.startNode.localization;
  const end = segment.endNode.localization;

  return new google.maps.Polyline({
    path: [{lat: start.latitude, lng: start.longitude}, {lat: end.latitude, lng: end.longitude}],
    geodesic: true,
    strokeColor: preStrokeOptions.color,
    strokeOpacity: preStrokeOptions.opacity,
    strokeWeight: preStrokeOptions.weight
  })
}
