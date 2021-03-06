#import "TextileEvents.h"

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include(“RCTBridge.h”)
#import “RCTBridge.h”
#else
#import “React/RCTBridge.h”
#endif

#import "TextileEvents.h"
#import "utils.h"

@implementation TextileEvents

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
  return @[
           @"NODE_STARTED",
           @"NODE_FAILED_TO_START",
           @"NODE_STOPPED",
           @"NODE_FAILED_TO_STOP",
           @"NODE_ONLINE",
           @"WILL_STOP_NODE_IN_BACKGROUND_AFTER_DELAY",
           @"CANCELED_PENDING_NODE_STOP",
           @"NOTIFICATION_RECEIVED",
           @"THREAD_UPDATE_RECEIVED",
           @"THREAD_ADDED",
           @"THREAD_REMOVED",
           @"ACCOUNT_PEER_ADDED",
           @"ACCOUNT_PEER_REMOVED",
           @"QUERY_DONE",
           @"QUERY_ERROR",
           @"CLIENT_THREAD_QUERY_RESULT",
           @"CONTACT_QUERY_RESULT",
           @"SYNC_UPDATE",
           @"SYNC_COMPLETE",
           @"SYNC_FAILED",
           @"PUBSUB_QUERY_RESULT"
         ];
}

- (void)nodeStarted {
  [self sendEventWithName:@"NODE_STARTED" body:nil];
}

- (void)nodeFailedToStartWithError:(NSError *)error {
  [self sendEventWithName:@"NODE_FAILED_TO_START" body:error.localizedDescription];
}

- (void)nodeStopped {
  [self sendEventWithName:@"NODE_STOPPED" body:nil];
}

- (void)nodeFailedToStopWithError:(NSError *)error {
  [self sendEventWithName:@"NODE_FAILED_TO_STOP" body:error.localizedDescription];
}

- (void)nodeOnline {
  [self sendEventWithName:@"NODE_ONLINE" body:nil];
}

- (void)willStopNodeInBackgroundAfterDelay:(NSTimeInterval)seconds {
  [self sendEventWithName:@"WILL_STOP_NODE_IN_BACKGROUND_AFTER_DELAY" body:[NSNumber numberWithDouble:seconds]];
}

- (void)canceledPendingNodeStop {
  [self sendEventWithName:@"CANCELED_PENDING_NODE_STOP" body:nil];
}

- (void)notificationReceived:(Notification *)notification {
  [self sendEventWithName:@"NOTIFICATION_RECEIVED" body:[notification.data base64EncodedStringWithOptions:0]];
}

- (void)threadUpdateReceived:(NSString *)threadId data:(FeedItemData *)feedItemData {
  [self sendEventWithName:@"THREAD_UPDATE_RECEIVED" body:@{
                                                           @"threadId" : threadId,
                                                           @"block" : feedItemData.block,
                                                           @"type" : [NSNumber numberWithUnsignedInteger:feedItemData.type],
                                                           @"data" : feedItemDataToBase64(feedItemData)
                                                           }];
}

- (void)threadAdded:(NSString *)threadId {
  [self sendEventWithName:@"THREAD_ADDED" body:threadId];
}

- (void)threadRemoved:(NSString *)threadId {
  [self sendEventWithName:@"THREAD_REMOVED" body:threadId];
}

- (void)accountPeerAdded:(NSString *)peerId {
  [self sendEventWithName:@"ACCOUNT_PEER_ADDED" body:peerId];
}

- (void)accountPeerRemoved:(NSString *)peerId {
  [self sendEventWithName:@"ACCOUNT_PEER_REMOVED" body:peerId];
}

- (void)queryDone:(NSString *)queryId {
  [self sendEventWithName:@"QUERY_DONE" body:queryId];
}

- (void)queryError:(NSString *)queryId error:(NSError *)error {
  NSDictionary *body = @{
                         @"queryId": queryId,
                         @"error": error.localizedDescription
                       };
  [self sendEventWithName:@"QUERY_ERROR" body:body];
}

- (void)pubsubQueryResult:(NSString *)queryId message:(NSString *)message  messageId:(NSString *)messageId {
  NSDictionary *body = @{
                         @"queryId": queryId,
                         @"message": message,
                         @"messageId": messageId
                       };
  [self sendEventWithName:@"PUBSUB_QUERY_RESULT" body:body];
}

- (void)clientThreadQueryResult:(NSString *)queryId thread:(Thread *)thread {
  NSDictionary *body = @{
                         @"queryId": queryId,
                         @"data": [thread.data base64EncodedStringWithOptions:0]
                       };
  [self sendEventWithName:@"CLIENT_THREAD_QUERY_RESULT" body:body];
}

- (void)contactQueryResult:(NSString *)queryId contact:(Contact *)contact {
  NSDictionary *body = @{
                         @"queryId": queryId,
                         @"data": [contact.data base64EncodedStringWithOptions:0]
                       };
  [self sendEventWithName:@"CONTACT_QUERY_RESULT" body:body];
}

- (void)syncUpdate:(CafeSyncGroupStatus *)status {
  [self sendEventWithName:@"SYNC_UPDATE" body:[status.data base64EncodedStringWithOptions:0]];
}

- (void)syncComplete:(CafeSyncGroupStatus *)status {
  [self sendEventWithName:@"SYNC_COMPLETE" body:[status.data base64EncodedStringWithOptions:0]];
}

- (void)syncFailed:(CafeSyncGroupStatus *)status {
  [self sendEventWithName:@"SYNC_FAILED" body:[status.data base64EncodedStringWithOptions:0]];
}

@end

@implementation RCTBridge (TextileEvents)

- (TextileEvents *)textileEvents {
  return [self moduleForClass:[TextileEvents class]];
}

@end
