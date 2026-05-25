import { useGetSchemes, getGetSchemesQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Schemes() {
  const { data: schemes, isLoading } = useGetSchemes({}, { query: { queryKey: getGetSchemesQueryKey() } });

  return (
    <div className="p-4 space-y-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-1">Government Schemes</h1>
        <p className="text-sm text-muted-foreground">Find subsidies and support programs.</p>
      </header>

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))
        ) : schemes?.map((scheme, i) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="overflow-hidden border-border/50">
              <CardHeader className="bg-muted/30 pb-3 border-b border-border/50">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-lg font-bold leading-tight">{scheme.name}</CardTitle>
                  <Badge variant="outline" className="bg-background shrink-0">{scheme.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <p className="text-sm text-muted-foreground">{scheme.description}</p>
                
                <div className="bg-primary/5 rounded-lg p-3 text-sm">
                  <span className="font-semibold text-primary block mb-1">Benefits:</span>
                  {scheme.benefit}
                </div>
                
                <div className="text-sm">
                  <span className="font-medium text-foreground block mb-1">Eligibility:</span>
                  <p className="text-muted-foreground">{scheme.eligibility}</p>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/10 border-t border-border/50 pt-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
                <div className="flex items-center text-xs text-muted-foreground font-medium w-full sm:w-auto">
                  <Calendar className="w-4 h-4 mr-2" />
                  {scheme.deadline ? `Deadline: ${new Date(scheme.deadline).toLocaleDateString()}` : 'No deadline'}
                </div>
                {scheme.applicationLink && (
                  <Button className="w-full sm:w-auto bg-primary text-primary-foreground" asChild>
                    <a href={scheme.applicationLink} target="_blank" rel="noopener noreferrer">
                      Apply Now <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
