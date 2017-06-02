#import "NativeModule.h"
#import <UIKit/UIKit.h>

@interface NativeModule ()

@end

@implementation NativeModule

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(loadData,
                 loadDataWithUrlString:(NSString *)url resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  NSLog(@"loadData on iOS side");
  resolve(@"loadData on iOS succeeded");
}

RCT_REMAP_METHOD(handleEvent,
                 handleEvent:(NSDictionary *)eventInfo)
{
  NSLog(@"handleEvent on iOS side");
  dispatch_async(dispatch_get_main_queue(), ^{
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Info" message:@"handleEvent on iOS side" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil];
    [alert show];
  });
}

@end
