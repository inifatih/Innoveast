"use client";

import { fetchQuestionsForCurrentInovator, markQuestionAsRead, Question } from "@/app/(MainLayout)/profile/pesan-masuk/action"; // server function
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";

export default function QuestionsList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortNewest, setSortNewest] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const result = await fetchQuestionsForCurrentInovator();
      console.log("Fetched questions:", result);

      setQuestions(result ?? []);
    } catch (error) {
      console.error("Failed to load questions:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const sortedQuestions = [...questions].sort((a, b) =>
    sortNewest
      ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      : new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  if (loading) return <p>Loading...</p>;

  return (
    <Card className="mx-28 shadow-lg border border-none py-6">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Pesan Masuk</CardTitle>
        <Button size="sm" onClick={() => setSortNewest(!sortNewest)}>
          {sortNewest ? "Urutkan Terlama" : "Urutkan Terbaru"}
        </Button>
      </CardHeader>

      <CardContent>
        {sortedQuestions.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada pertanyaan.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pengirim</TableHead>
                <TableHead>Instansi</TableHead>
                <TableHead>Subjek</TableHead>
                <TableHead>Pesan</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedQuestions.map((q) => (
                <TableRow
                  key={q.id}
                  className={`transition ${
                    q.status === "belum dibaca"
                      ? "bg-yellow-50 font-semibold"
                      : ""
                  }`}
                >
                  <TableCell>
                    {q.nama_lengkap}
                  </TableCell>

                  <TableCell>
                    {q.instansi || "—"}
                  </TableCell>

                  <TableCell>{q.subjek || "—"}</TableCell>

                  <TableCell className="">
                    {q.pesan}
                  </TableCell>

                  <TableCell>
                    {new Date(q.created_at).toLocaleDateString("id-ID")}
                  </TableCell>

                  <TableCell>
                    {q.status}
                  </TableCell>

                  <TableCell className="text-right">
                    {q.status === "belum dibaca" && (
                      <Button
                        size="sm"
                        variant="outline"
                        type="submit"
                        className="cursor-pointer hover:bg-orange-400 border-gray-400"
                        onClick={async () => {
                          await markQuestionAsRead(q.id);
                          loadData(); // refresh table
                        }}
                      >
                        Tandai Dibaca
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
