import SafetyIndicator from '../SafetyIndicator';

export default function SafetyIndicatorExample() {
  return (
    <div className="space-y-4 p-4">
      <SafetyIndicator level="safe" score={8} />
      <SafetyIndicator level="moderate" score={5} />
      <SafetyIndicator level="avoid" score={2} />
      <SafetyIndicator level="safe" size="sm" />
      <SafetyIndicator level="moderate" size="lg" showText={false} />
    </div>
  );
}