/* eslint-disable quotes */
import React, { PureComponent } from "react";
import { View, StyleSheet, Animated, PanResponder } from "react-native";
import PropTypes from "prop-types";
import {
  HORIZONTAL,
  VERTICAL,
  PERCENT_FULL,
  PERCENT_EMPTY,
} from "./constants/SliderConstants";
import linear from "./algorithms/linear";
import DefaultProgressBar from "./components/DefaultProgressBar";
import DefaultHandler from "./components/DefaultHandler";
import RheostatThemeProvider from "./theme";

const PropTypeArrOfNumber = PropTypes.arrayOf(PropTypes.number);
const PropTypeReactComponent = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.object,
]);
class Rheostat extends PureComponent {
  constructor(props) {
    super(props);
    const { algorithm, max, min, values } = this.props;
    this.state = {
      handleDimensions: 0,
      sliderBox: {},
      slidingIndex: null,
      containerSize: { width: 0, height: 0 },
      values: values.map((value) => new Animated.Value(value)),
      handlePos: values.map(
        (value) => new Animated.Value(algorithm.getPosition(value, min, max))
      ),
    };
    // this.getPublicState = this.getPublicState.bind(this);
    // this.getProgressStyle = this.getProgressStyle.bind(this);
    // this.getClosestSnapPoint = this.getClosestSnapPoint.bind(this);
    // this.getSnapPosition = this.getSnapPosition.bind(this);
    // this.startSlide = this.startSlide.bind(this);
    // this.endSlide = this.endSlide.bind(this);
    // this.moveSlide = this.moveSlide.bind(this);
    // this.validatePosition = this.validatePosition.bind(this);
    // this.getNextState = this.getNextState.bind(this);
    this.pitStyleCache = {};
  }

  componentDidMount() {
    const { handlePos } = this.state;
    const customPanResponder = function (idx, start, move, end) {
      return PanResponder.create({
        /* eslint-disable */
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: () => start(idx),
        onPanResponderMove: (evt, gestureState) => move(idx, gestureState),
        onPanResponderTerminationRequest: () => false,
        onPanResponderRelease: (evt, gestureState) => end(idx, gestureState),
        onPanResponderTerminate: (evt, gestureState) => end(idx, gestureState),
        // onShouldBlockNativeResponder: (evt, gestureState) => true
        /* eslint-enable */
      });
    };
    this._panResponders = handlePos.map((val, idx, arr) =>
      customPanResponder(idx, this.startSlide, this.moveSlide, this.endSlide)
    );
  }

  getClosestSnapPoint = (value) => {
    const { snapPoints } = this.props;
    if (!snapPoints.length) return value;

    return snapPoints.reduce((snapTo, snap) =>
      Math.abs(snapTo - value) < Math.abs(snap - value) ? snapTo : snap
    );
  };

  getSnapPosition = (positionPercent) => {
    const { algorithm, max, min, snap } = this.props;

    if (!snap) return positionPercent;
    const value = algorithm.getValue(positionPercent, min, max);
    const snapValue = this.getClosestSnapPoint(value);
    return algorithm.getPosition(snapValue, min, max);
  };

  getNextState = (idx, proposedPosition) => {
    const { handlePos, values } = this.state;
    const { max, min, algorithm } = this.props;
    const actualPosition = this.validatePosition(idx, proposedPosition);
    values.forEach(
      (value, index) =>
        index === idx &&
        value.setValue(algorithm.getValue(actualPosition, min, max))
    );
    handlePos.forEach(
      (value, index) => index === idx && value.setValue(actualPosition)
    );
    return {
      handlePos,
      // values: nextHandlePos.map(pos => algorithm.getValue(pos, min, max)),
      values,
    };
  };

  getPublicState = () => {
    const { values } = this.state;
    const { min, max } = this.props;

    return {
      max,
      min,
      values: values.map((value) => value.__getValue()),
    };
  };

  getProgressStyle = (idx) => {
    const { orientation } = this.props;
    const {
      handlePos,
      containerSize: { width },
    } = this.state;

    const pos = handlePos[idx].interpolate(
      {
        inputRange: [0, 100],
        outputRange: [0, width],
      },
      { useNativeDriver: true }
    );

    if (idx === 0) {
      return orientation === "vertical"
        ? { height: pos, top: 0 }
        : { left: 0, width: pos };
    }
    const prevValue = handlePos[idx - 1].interpolate(
      {
        inputRange: [0, 100],
        outputRange: [0, -width],
      },
      { useNativeDriver: true }
    );
    const prevPos = handlePos[idx - 1].interpolate(
      {
        inputRange: [0, 100],
        outputRange: [0, width],
      },
      { useNativeDriver: true }
    );
    const diffValue = Animated.add(pos, prevValue);
    return orientation === "vertical"
      ? { transform: [{ translateY: prevPos }], height: diffValue }
      : { transform: [{ translateX: prevPos }], width: diffValue };
  };

  getHandleDimensions = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    this.setState({
      handleDimensions: {
        width,
        height,
      },
    });
  };

  getRheostatDimensions = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    this.setState({
      containerSize: {
        width,
        height,
      },
    });
  };

  startSlide = (idx) => {
    const { onSliderDragStart } = this.props;
    const {
      handlePos,
      // values
    } = this.state;
    onSliderDragStart && onSliderDragStart(); //eslint-disable-line
    this.previousHandlePos = handlePos.map((value) => value.__getValue());
  };

  moveSlide = (idx, gestureState) => {
    const { onValuesUpdated } = this.props;
    const {
      // handlePos,
      containerSize: { width },
      values,
    } = this.state;
    const proposedPosition =
      (gestureState.dx / width) * PERCENT_FULL + this.previousHandlePos[idx];
    const snapPosition = this.getSnapPosition(proposedPosition);
    const nextState = this.getNextState(idx, snapPosition);
    if (onValuesUpdated) onValuesUpdated(this.getPublicState());
  };

  endSlide = (idx, gestureState) => {
    const { onSliderDragEnd } = this.props;
    if (onSliderDragEnd) onSliderDragEnd(this.getPublicState());
  };

  validatePosition = (idx, proposedPosition) => {
    const { handlePos, values, handleDimensions, containerSize } = this.state;
    const nextPosition = proposedPosition;
    const { orientation } = this.props;
    const handlePercentage =
      orientation === VERTICAL
        ? ((handleDimensions.width / containerSize.height) * PERCENT_FULL) / 2
        : ((handleDimensions.width / containerSize.width) * PERCENT_FULL) / 2;
    // nextPosition should be handlePos[idx-1] < nextPosition < handlePos[idx+1]
    return Math.max(
      Math.min(
        nextPosition,
        handlePos[idx + 1] !== undefined
          ? handlePos[idx + 1].__getValue() - handlePercentage
          : PERCENT_FULL // 100% is the highest value
      ),
      handlePos[idx - 1] !== undefined
        ? handlePos[idx - 1].__getValue() + handlePercentage
        : PERCENT_EMPTY // 0% is the lowest value
    );
  };

  render() {
    const {
      algorithm,
      children,
      handle: Handle,
      max,
      min,
      orientation,
      pitComponent: PitComponent,
      pitPoints,
      progressBar: ProgressBar,
      theme,
    } = this.props;
    const { handlePos, containerSize } = this.state;
    return (
      <View
        style={[
          {
            marginVertical: 18,
            marginHorizontal: 10,
            position: 'relative',
          },
        ]}
      >
        {handlePos.map((value, idx) => {
          const pos = value.interpolate(
            {
              inputRange: [0, 100],
              outputRange: [0, containerSize.width],
            },
            { useNativeDriver: true }
          );
          const handleStyle =
            orientation === 'vertical'
              ? { transform: [{ translateY: pos }] }
              : { transform: [{ translateX: pos }] };
          return this._panResponders ? (
            <Animated.View
              style={[Style.handleContainer, handleStyle]}
              {...this._panResponders[idx].panHandlers}
              onLayout={this.getHandleDimensions}
              renderToHardwareTextureAndroid
              key={`handle-${idx}`}
            >
              <Handle theme={theme} style={[Style.handle]} />
            </Animated.View>
          ) : null;
        })}
        <View
          onLayout={this.getRheostatDimensions}
          style={[
            Style.container,
            orientation === "horizontal" && Style.rheostatHorizontal,
          ]}
        >
          <View
            style={[
              Style.rheostatBackground,
              Style.rheostatHorizontalBackground,
            ]}
          />
          {handlePos.map((value, idx, arr) => {
            if (idx === 0 && arr.length > 1) {
              return null;
            }
            return (
              <Animated.View
                key={`progress-bar-${idx}`}
                renderToHardwareTextureAndroid
                style={[
                  { position: "absolute", height: "auto" },
                  this.getProgressStyle(idx),
                ]}
              >
                <ProgressBar theme={theme} />
              </Animated.View>
            );
          })}
          {PitComponent &&
            pitPoints.map((n) => {
              let pitStyle = this.pitStyleCache[n];
              if (!pitStyle) {
                const pos = algorithm.getPosition(n, min, max);
                pitStyle =
                  orientation === "vertical"
                    ? { top: `${pos}%`, position: "absolute" }
                    : { left: `${pos}%`, position: "absolute" };
                this.pitStyleCache[n] = pitStyle;
              }
              return (
                <PitComponent key={`pit-${n}`} style={pitStyle}>
                  {n}
                </PitComponent>
              );
            })}
          {children}
        </View>
      </View>
    );
  }
}
Rheostat.propTypes = {
  // the algorithm to use
  algorithm: PropTypes.shape({
    getValue: PropTypes.func,
    getPosition: PropTypes.func,
  }),

  // the maximum possible value
  max: PropTypes.number,

  // the minimum possible value
  min: PropTypes.number,

  // called when you finish dragging a handle
  onSliderDragEnd: PropTypes.func,

  // called when you start dragging a handle
  onSliderDragStart: PropTypes.func,

  // called whenever the user is actively changing the values on the slider
  // (dragging, clicked, keypress)
  onValuesUpdated: PropTypes.func,

  // the orientation
  orientation: PropTypes.oneOf([HORIZONTAL]),

  // the points that pits are rendered on
  pitPoints: PropTypeArrOfNumber,

  // any children you pass in
  children: PropTypes.node,
  // a component for rendering the pits
  pitComponent: PropTypeReactComponent,
  // a custom progress bar you can pass in
  progressBar: PropTypeReactComponent,
  // a custom handle you can pass in
  handle: PropTypeReactComponent,

  // should we snap?
  snap: PropTypes.bool,
  // the points we should snap to
  snapPoints: PropTypeArrOfNumber,
  // the values
  values: PropTypeArrOfNumber,
};
Rheostat.defaultProps = {
  algorithm: linear,
  className: "",
  children: null,
  disabled: false,
  handle: DefaultHandler,
  max: PERCENT_FULL,
  min: PERCENT_EMPTY,
  onPress: null,
  onChange: null,
  onSliderDragEnd: null,
  onSliderDragMove: null,
  onSliderDragStart: null,
  onValuesUpdated: null,
  orientation: "horizontal",
  pitComponent: null,
  pitPoints: [],
  progressBar: DefaultProgressBar,
  snap: false,
  snapPoints: [],
  getNextHandlePosition: null,
  theme: undefined,
};

const Style = StyleSheet.create({
  rheostatHorizontal: {
    position: "relative",
  },
  handle: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  handleContainer: {
    zIndex: 3,
    position: "absolute",
    width: 30,
    height: 30,
    marginLeft: -15,
    bottom: -15,
  },
  container: {
    justifyContent: "center",
  },
  rheostatBackground: {
    // backgroundColor: '#fcfcfc',
    borderColor: "#d8d8d8",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    position: "relative",
  },
  rheostatHorizontalBackground: {
    height: 1,
    width: "100%",
  },
  rheostatProgress: {
    position: "absolute",
  },
  rheostatHorizontalProgress: {
    height: 13,
    top: 2,
  },
  fullTrack: {
    flexDirection: "row",
  },
  track: {
    justifyContent: "center",
  },
  touch: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

export default Rheostat;
export { RheostatThemeProvider };
