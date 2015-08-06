//
//  RCTPhotoData.m
//  React
//
//  Created by Albert Tang on 7/30/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
// defines NSObject, NSString, NSData, NSURL, NSError, NSLog
#import <UIKit/UIKit.h>
// defines UIImage, UIImageJPEGRepresentation
#import <AssetsLibrary/AssetsLibrary.h>
// defines ALAssetsLibrary

#import "RCTBridgeModule.h"
// framework used to create simple React modules

@interface PhotoData : NSObject <RCTBridgeModule>
// in interface PhotoData.h 
// (.h files normally contain declarations of attributes and methods for your class, in this case there are none)
// class PhotoData is defined as a direct subclass of NSObject RCTBridgeModule
@end

@implementation PhotoData
// in implementation PhotoData.m
// (.m files normally contain implementations of the declared methods and attributes)

RCT_EXPORT_MODULE();
// expose module to the React Native bridge
// takes in an optional argument that specifies the name used to access it, by default the name is the class name

RCT_EXPORT_METHOD(
// export a single method
  getData:
    (NSString *)uri
    // first parameter is the Assets Library url
    // parameters are delimited by :, but giving them names is recommended
    callback:(RCTResponseSenderBlock)callback
    // second parameter is a callback on success
    errorCallback:(RCTResponseSenderBlock)failureCallback)
    // third parameter is a callback on failure
  {
    
    NSURL *url = [[NSURL alloc] initWithString:uri];
    // create NSURL, which stores path information more efficiently and comes with an extensive set of methods
    
    ALAssetsLibrary *library = [[ALAssetsLibrary alloc] init];
    // create an ALAssetsLibrary instance, which provides access to photos and videos in the Photos app
    
    [library assetForURL:
    // have the library invoke its assetForURL method, which finds assets
    // while properties on objects tend to be accessed with dot notation, methods should instead be called using messages
    // square brackets are used to send messages to objects, basically telling the object to use a method it has
      url 
      // first argument is an asset URL

      resultBlock:^(ALAsset *asset) {
      // second argument is a block to invoke using the asset identified by the url as its first argument
      // blocks are anonymous functions and are implemented as closures, they are defined by ^
      
        ALAssetRepresentation *representation = [asset defaultRepresentation];
        // grab a representation (other options are thumbnail, representationForUTI, and aspectRatioThumbnail
        CGImageRef cgImage = [representation fullResolutionImage];
        // grab the Quartz image (other options are fullScreenImage and CGImageWithOptions)

        NSData *imgdata = UIImageJPEGRepresentation([UIImage imageWithCGImage:cgImage], 0);
        // create UIImage from cgImage
        // turn UIImage into data
        // first argument is the UIImage, second argument is the compression quality (1 is the highest, 0 is the lowest)
        
        NSString *b64data = [imgdata base64EncodedStringWithOptions:0];
        // grab base64 encoded string
        
        callback(@[b64data]);
        // invoke the callback on the base64data
      
      }

      failureBlock:^(NSError *error) {
      // third argument is a block to invoke if access to the library is denied
        NSLog(@"Error: %@", error);
      }
    ];
    
  }

@end
