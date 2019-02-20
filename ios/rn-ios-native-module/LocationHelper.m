//
//  LocationHelper.m
//  rn-ios-native-module
//
//  Created by Vasant Hugar on 20/02/19.
//  Copyright © 2019 650 Industries, Inc. All rights reserved.
//

#import "LocationHelper.h"

@implementation LocationHelper
{
    CLLocationManager *clmanager;
}

RCT_EXPORT_MODULE();

- (instancetype)init
{
    if ((self = [super init])) {
        clmanager = [[CLLocationManager alloc] init];
        clmanager.delegate = self;
        clmanager.distanceFilter = kCLDistanceFilterNone;
        clmanager.desiredAccuracy = kCLLocationAccuracyBest;
        
        [clmanager requestAlwaysAuthorization];
    }
    return self;
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"HandleLocationUpdate"];
}

RCT_EXPORT_METHOD(startUpdatingLocation)
{
    [clmanager startUpdatingLocation];
}

RCT_EXPORT_METHOD(stopUpdatingLocation)
{
    [clmanager stopUpdatingLocation];
}

/**
 *  All Directions Method
 */
/*---------------------------------------*/
#pragma mark - CLLocation Delegate Method
/*---------------------------------------*/
- (void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status
{
    [self sendEventWithName:@"HandleLocationUpdate" body:@{@"status": @"didChangeAuthorizationStatus",
                                                           @"error": @"",
                                                           @"data": @{}
                                                           }];
}
/*
 To Get Updated lattitude & longitude
 @return nil.
 */
- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray *)locations
{
    CLLocation *location = [locations lastObject];
    
    [self sendEventWithName:@"HandleLocationUpdate" body:@{@"status": @"didUpdateLocations",
                                                           @"error": @"",
                                                           @"data": @{}
                                                           }];
    
    /*****************************************************/
    CLGeocoder *geocoder = [[CLGeocoder alloc] init];
    [geocoder reverseGeocodeLocation: location
                   completionHandler:^(NSArray *placemarks, NSError *error) {
                       
                       if (placemarks) {
                           
                           //Street number and name
                           NSString *street = [NSString stringWithFormat:@"%@",[[placemarks objectAtIndex:0] thoroughfare]];
                           
                           NSString *area = [NSString stringWithFormat:@"%@",[[placemarks objectAtIndex:0] subLocality]];
                           
                           NSString *city = [NSString stringWithFormat:@"%@",[[placemarks objectAtIndex:0] locality]];
                           
                           NSString *state = [NSString stringWithFormat:@"%@",[[placemarks objectAtIndex:0] administrativeArea]];
                           
                           NSString *country = [NSString stringWithFormat:@"%@",[[placemarks objectAtIndex:0] country]];
                           
                           NSString *countryCode = [NSString stringWithFormat:@"%@",[[placemarks objectAtIndex:0] ISOcountryCode]];
                           
                           NSString *zipCode = [NSString stringWithFormat:@"%@",[[placemarks objectAtIndex:0] postalCode]];
                           
                           NSDictionary *dict = @{@"street": street,
                                                  @"area": area,
                                                  @"city": city,
                                                  @"state": state,
                                                  @"country": country,
                                                  @"countryCode": countryCode,
                                                  @"zipCode": zipCode,
                                                  @"lat": [NSNumber numberWithDouble:location.coordinate.latitude],
                                                  @"lng": [NSNumber numberWithDouble:location.coordinate.longitude]
                                                  };
                           
                           [self sendEventWithName:@"HandleLocationUpdate" body:@{@"status": @"didUpdateLocations",
                                                                                  @"error": @"",
                                                                                  @"data": dict
                                                                                  }];
                           
                       }
                       else {
                           NSLog(@"Failed to update location : %@",error);
                           [self sendEventWithName:@"HandleLocationUpdate" body:@{@"status": @"didUpdateLocations",
                                                                                  @"error": error.localizedDescription,
                                                                                  @"data": @{}
                                                                                  }];
                       }
                   }];
}

/*
 To print error msg of location manager
 @param error msg.
 @return nil.
 */
- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error
{
    [self sendEventWithName:@"HandleLocationUpdate" body:@{@"status": @"didFailWithError",
                                                           @"error": error.localizedDescription,
                                                           @"data": @{}
                                                           }];
}
@end
