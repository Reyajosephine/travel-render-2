return (
  <>
    {loading ? (
      <Loading onLoadingComplete={() => setLoading(false)} />
    ) : (
      // Your main app content
    )}
  </>
);