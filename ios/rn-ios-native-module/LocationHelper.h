//
//  LocationHelper.h
//  rn-ios-native-module
//
//  Created by Vasant Hugar on 20/02/19.
//  Copyright © 2019 650 Industries, Inc. All rights reserved.
//

#import <React/RCTBridgeModule.h>
//#import <UIKit/UIKit.h>
#import <CoreLocation/CoreLocation.h>
#import <React/RCTEventEmitter.h>

@interface LocationHelper : RCTEventEmitter <RCTBridgeModule, CLLocationManagerDelegate>
{
//    CLLocationManager *clmanager;
//    RCTResponseSenderBlock locationHelperCallback;
}

@end

