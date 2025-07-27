import ResultCard from './ResultCard';

export default function ResultsList({ results }) {
  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <ResultCard key={`${result.url}-${index}`} result={result} />
      ))}
    </div>
  );
}