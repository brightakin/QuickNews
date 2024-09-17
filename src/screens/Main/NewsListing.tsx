import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {COLORS} from '../../constants/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {useEffect, useState} from 'react';
import {getNews} from '../../redux/actions/newsActions';
import GridView from '../../components/shared/GridView';
import React from 'react';
import {fontPixel, heightPixel, widthPixel} from '../../utils/normalize';

const NewsListingScreen = ({navigation}: any): JSX.Element => {
  const dispatch = useAppDispatch();
  const newsList = useAppSelector(state => state.newsList);
  const {loading, error, newsData} = newsList;
  const {colors}: any = useTheme();

  // States for pagination
  const [startIndex, setStartIndex] = useState<number>(0); // Starting index for lazy loading
  const batchSize = 20; // Number of news items to load in each batch
  const [hasMore, setHasMore] = useState<boolean>(true); // Check if more data is available
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const getFormattedDate = () => {
    const today = new Date();
    const options: any = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(today);
  };

  // Fetch initial data
  useEffect(() => {
    fetchNews(false); // Initial load without appending
  }, [dispatch]);

  // Function to fetch news items
  const fetchNews = async (append: boolean) => {
    if (loading || !hasMore) return; // Do nothing if already loading or no more data

    try {
      await dispatch(getNews(startIndex, batchSize, append)); // Dispatch the action to fetch news
      setStartIndex(startIndex + batchSize); // Update the start index for the next batch
    } catch (err) {
      console.error('Error fetching news:', err);
    }
  };

  // Refresh handler to refresh the news list
  const refreshHandler = async () => {
    setIsRefreshing(true);
    try {
      setStartIndex(0); // Reset startIndex
      setHasMore(true); // Reset hasMore
      await fetchNews(false); // Fetch the first batch again, not appending
    } catch (err) {
      console.error('Error refreshing news:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Function to load more news items when user scrolls near the bottom
  const loadMoreNews = () => {
    if (!loading && hasMore) {
      fetchNews(true); // Append new news when loading more
    }
  };

  // Empty component when no news data is available
  const emptyComponent = () => (
    <View style={styles.noDisplay}>
      <Text style={[{color: colors, fontSize: heightPercentageToDP(3)}]}>
        No Data Found
      </Text>
    </View>
  );

  // List footer component to show loading spinner when fetching more news
  const renderFooter = () => {
    if (!hasMore) return null; // If no more news, don't show spinner
    return <ActivityIndicator size="large" color={COLORS.primaryOrange} />;
  };

  // Render UI
  return (
    <SafeAreaView edges={['right', 'left', 'top']} style={[styles.container]}>
      <View
        style={[
          styles.flexContainer,
          {
            justifyContent: 'space-between',
            paddingHorizontal: heightPercentageToDP(2.5),
          },
        ]}>
        <View>
          <Text
            style={[
              styles.primaryText,
              {
                color: COLORS.white,
                fontSize: fontPixel(23.33),
                fontWeight: '700',
              },
            ]}>
            Top Stories
          </Text>
          <Text
            style={[
              styles.primaryText,
              {
                color: COLORS.white,
                fontSize: fontPixel(13.33),
                fontWeight: '300',
                marginTop: heightPixel(10),
                marginBottom: heightPixel(10),
              },
            ]}>
            {getFormattedDate()}
          </Text>
        </View>
      </View>

      <View
        style={[
          {
            backgroundColor: colors.background,
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
            flex: 1,
            paddingTop: heightPixel(40),
            paddingHorizontal: widthPixel(10),
          },
        ]}>
        {loading && startIndex === 0 ? (
          <ActivityIndicator size="large" color={COLORS.primaryOrange} />
        ) : (
          <FlatList
            data={newsData}
            keyExtractor={(item: any, index: any) => item.id + index.toString()}
            renderItem={({item, index}) => (
              <GridView
                colors={colors}
                item={item}
                index={index}
                navigation={navigation}
              />
            )}
            ListEmptyComponent={emptyComponent}
            ListFooterComponent={renderFooter}
            onRefresh={refreshHandler}
            refreshing={isRefreshing}
            onEndReached={loadMoreNews} // Trigger load more when user scrolls near the bottom
            onEndReachedThreshold={0.5} // Trigger when 50% away from bottom
            initialNumToRender={10} // Number of items to load initially
            maxToRenderPerBatch={5} // Number of items to render per batch
            windowSize={7} // Size of the window for rendering
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NewsListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryOrange,
    paddingTop: heightPercentageToDP(4),
  },
  flexContainer: {
    flexDirection: 'row',
  },
  noDisplay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
    height: 90,
  },
  primaryText: {
    fontSize: heightPercentageToDP(1.9),
  },
});
