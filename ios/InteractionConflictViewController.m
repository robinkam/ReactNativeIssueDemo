//
//  InteractionConflictViewController.m
//  ReactNativeIssueDemo
//
//  This demo illustrates the issue that when putting a RCTRootView containing a Touchable component into a UIScrollView and begin scroll at the Touchable area, both the UIScrollViewDelegate methods and the onPress function of the Touchable component will be triggered, which would be unexpected in most cases. 
//
//  Created by ganquan on 2017/6/8.
//

#import "InteractionConflictViewController.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@interface InteractionConflictViewController () <UIScrollViewDelegate>
@property (nonatomic, strong) UIScrollView *scrollView;
@property (nonatomic, strong) RCTRootView *rctRootView;
@end

@implementation InteractionConflictViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  
  self.scrollView = [[UIScrollView alloc] initWithFrame:self.view.bounds];
  self.scrollView.delegate = self;
  
  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"InteractionConflict"
                                               initialProperties:nil
                                                   launchOptions:nil];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  rootView.frame = self.view.bounds;
  self.rctRootView = rootView;
  
  CGRect placeholderFrame = self.view.frame;
  placeholderFrame.origin.x = placeholderFrame.size.width;
  UIView *placeholderView = [[UIView alloc] initWithFrame:placeholderFrame];
  [placeholderView setBackgroundColor:[UIColor colorWithWhite:0.5f alpha:1.0f]];
  
  [self.scrollView addSubview:rootView];
  [self.scrollView addSubview:placeholderView];
  self.scrollView.contentSize = CGSizeMake(placeholderFrame.size.width * 2, placeholderFrame.size.height);
  
  [self.view addSubview:self.scrollView];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - UIScrollViewDelegate
-(void)scrollViewWillBeginDragging:(UIScrollView *)scrollView{
  // WORKAROUND: add this line when touch begins to resolve the react native Touchable and UIScrollView interaction conflict.
//  [self.rctRootView cancelTouches];
}
-(void)scrollViewDidScroll:(UIScrollView *)scrollView{
  CGFloat colorValue = random() % 255;
  UIColor *color = [UIColor colorWithRed:colorValue green:colorValue blue:colorValue alpha:1.0f];
  [scrollView setBackgroundColor:color];
}
@end
